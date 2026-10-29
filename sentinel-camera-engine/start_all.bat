@echo off
echo ========================================================
echo Launching Zyncoo AI - Driver Sentinel (Backend + Frontend)
echo ========================================================

start "Zyncoo AI Backend" cmd /c "%~dp0run_backend.bat"
timeout /t 3 /nobreak >nul
start "Zyncoo AI Frontend" cmd /c "%~dp0run_frontend.bat"

echo.
echo Zyncoo AI servers initiated!
echo Dashboard available at: http://localhost:5173
echo.
