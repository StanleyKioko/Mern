@echo off
echo Removing config.env from Git history...

cd backend
git rm --cached config.env
echo "File removed from current index"

git filter-branch --force --index-filter "git rm --cached --ignore-unmatch backend/config.env" --prune-empty --tag-name-filter cat -- --all
echo "File removed from Git history"

echo "Now push the changes to GitHub with:"
echo "git push origin --force --all"
echo "git push origin --force --tags"

echo "Done! Your sensitive file should now be removed from GitHub."
