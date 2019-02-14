echo "Starting Ganache..."
ganache > /dev/null 2>&1 &
sleep 1
echo "Starting Mongodb..."
systemctl start mongodb
echo "Compiling contracts..."
truffle compile
echo "Deploying contracts..."
truffle deploy --reset > /dev/null
