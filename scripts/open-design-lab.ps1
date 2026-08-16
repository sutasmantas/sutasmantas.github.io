param(
  [switch]$NoBrowser,
  [switch]$NoWait
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $projectRoot

Write-Host 'Central portfolio visual lab' -ForegroundColor Cyan
Write-Host 'Preparing the interactive review artifact...'

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot 'node_modules\astro'))) {
  Write-Host 'Installing pinned dependencies...'
  & npm.cmd ci
  if ($LASTEXITCODE -ne 0) { throw "npm ci failed with exit code $LASTEXITCODE" }
}

& npm.cmd run build
if ($LASTEXITCODE -ne 0) { throw "npm run build failed with exit code $LASTEXITCODE" }

$reviewUrl = 'http://127.0.0.1:8912/design-lab/'
$alreadyRunning = $false
try {
  $response = Invoke-WebRequest -UseBasicParsing -Uri $reviewUrl -TimeoutSec 2
  $alreadyRunning = $response.StatusCode -eq 200
} catch {
  $alreadyRunning = $false
}

if ($alreadyRunning) {
  if (-not $NoBrowser) { Start-Process $reviewUrl }
  Write-Host 'The existing design-lab server is ready.' -ForegroundColor Green
  exit 0
}

$startInfo = [System.Diagnostics.ProcessStartInfo]::new()
$startInfo.FileName = (Get-Command node.exe).Source
$astroCli = Join-Path $projectRoot 'node_modules\astro\bin\astro.mjs'
$startInfo.Arguments = "`"$astroCli`" preview --port 8912 --host 127.0.0.1"
$startInfo.WorkingDirectory = $projectRoot
$startInfo.UseShellExecute = $false
$startInfo.CreateNoWindow = $true
$previewProcess = [System.Diagnostics.Process]::Start($startInfo)

function Stop-OwnedPreview {
  $listener = Get-NetTCPConnection -LocalPort 8912 -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($listener) {
    $listenerProcess = Get-CimInstance Win32_Process -Filter "ProcessId=$($listener.OwningProcess)" -ErrorAction SilentlyContinue
    $commandLine = [string]$listenerProcess.CommandLine
    $belongsToLab = $commandLine.IndexOf($projectRoot, [System.StringComparison]::OrdinalIgnoreCase) -ge 0 -and
      $commandLine.IndexOf('astro', [System.StringComparison]::OrdinalIgnoreCase) -ge 0
    if (-not $belongsToLab) {
      throw "Refusing to stop unrelated process $($listener.OwningProcess) on port 8912."
    }
    Stop-Process -Id $listener.OwningProcess -Force -ErrorAction SilentlyContinue
  }

  if (-not $previewProcess.HasExited) {
    Stop-Process -Id $previewProcess.Id -Force -ErrorAction SilentlyContinue
    $previewProcess.WaitForExit()
  }
}

$ready = $false
for ($attempt = 0; $attempt -lt 40; $attempt++) {
  Start-Sleep -Milliseconds 250
  if ($previewProcess.HasExited) { break }
  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri $reviewUrl -TimeoutSec 1
    if ($response.StatusCode -eq 200) { $ready = $true; break }
  } catch {
    # The preview server is still starting.
  }
}

if (-not $ready) {
  Stop-OwnedPreview
  throw 'The preview server did not become ready at http://127.0.0.1:8912.'
}

if (-not $NoBrowser) { Start-Process $reviewUrl }
Write-Host ''
Write-Host 'The live review dashboard is open:' -ForegroundColor Green
Write-Host $reviewUrl
Write-Host ''
if (-not $NoWait) {
  Write-Host 'Keep this window open while reviewing. Press Enter here to stop the local server.'
  [void](Read-Host)
}

Stop-OwnedPreview

for ($attempt = 0; $attempt -lt 20; $attempt++) {
  if (-not (Get-NetTCPConnection -LocalPort 8912 -State Listen -ErrorAction SilentlyContinue)) { break }
  Start-Sleep -Milliseconds 100
}

if (Get-NetTCPConnection -LocalPort 8912 -State Listen -ErrorAction SilentlyContinue) {
  throw 'The design-lab server did not release port 8912 cleanly.'
}
Write-Host 'Design-lab server stopped.'
