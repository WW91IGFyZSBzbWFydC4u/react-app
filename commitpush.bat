cd /D D:\temp_e\Projects\React\mythirdapp\frontend
call npm run-script build
robocopy build backend\build *.* /MIR /NP /NS /NC /NFL /NDL>NUL
git add -A && git commit -m "Your Message"
git push origin
timeout 5