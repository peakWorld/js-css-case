# 检查 dll文件是否存在
# dll文件 不存在, 执行npm run dll 生成dll文件
# dl文件存在, 执行 npm run dev 启动服务

workdir=$(cd $(dirname $0); cd ..; pwd)
dllPath="${workdir}/output/dll/vendors.dll.js" 

echo "$dllPath"

if [ ! -f "$dllPath" ]; then
npm run dll
fi

npm run dev

