@echo off
setlocal
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\open-design-lab.ps1"
if errorlevel 1 (
  echo.
  echo The design lab could not be opened. Review the error above.
  pause
)
