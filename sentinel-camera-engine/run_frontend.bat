@echo off
echo ========================================================
echo Starting Driver Drowsiness Dashboard Frontend...
echo ========================================================
cd /d %~dp0frontend
npm run dev
pause
