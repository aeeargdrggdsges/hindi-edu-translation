@echo off
title Hindi Educational Web Translation Demo
echo ===================================================================
echo Starting Shiksha Setu - Formal Hindi Translation Showcase...
echo ===================================================================
echo.
cd /d "%~dp0"
start "" http://localhost:4000
python -m http.server 4000
if %errorlevel% neq 0 (
    echo Python server failed, trying npx serve...
    npx serve -l 4000 .
)
pause
