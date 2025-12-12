echo ==========================================
cd /d "%~dp0"
echo   HOYA LOTTO - GITHUB DEPLOYMENT SCRIPT
echo ==========================================

REM Check if git is available
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is STILL not found in this terminal.
    echo Please close this window and open a NEW terminal/PowerShell.
    pause
    exit /b
)

echo [1/7] Initializing Git...
git init

echo [2/7] Adding files...
git add .

echo [3/7] Committing files...
git commit -m "Initial deploy to GitHub Pages"

echo [4/7] Renaming branch to main...
git branch -M main

echo [5/7] Adding remote origin...
REM Try to remove it first just in case it exists to avoid error
git remote remove origin 2>nul
git remote add origin https://github.com/armioz/HoyaLotto.git

echo [6/7] Pushing code to GitHub...
git push -u origin main

echo [7/7] Deploying to GitHub Pages...
call npm install gh-pages --save-dev
call npm run deploy
if %errorlevel% neq 0 (
    echo [ERROR] Deployment failed!
    echo Please check the error message above.
    pause
    exit /b
)

echo ==========================================
echo   DEPLOYMENT COMPLETE!
echo   Visit: https://armioz.github.io/HoyaLotto/
echo ==========================================
pause
