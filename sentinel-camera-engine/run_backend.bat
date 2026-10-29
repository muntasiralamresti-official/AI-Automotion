@echo off
echo ========================================================
echo Starting Zyncoo AI - Driver Sentinel Backend Server...
echo ========================================================
cd /d %~dp0backend
call .venv\Scripts\activate.bat
python main.py
pause
