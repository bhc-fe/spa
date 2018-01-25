let exec = require('child_process').exec,
		co = require('co'),
		path = require('path');

const SVN_URL = 'https://code.ds.gome.com.cn/svn/gome_bh_jszx/30_Coding/NewDevMode/trunk/car/gome-bhc-car';
const userName = "lijinya";
const SVN_PATH = "D:\\CAR_SRC_SVN"
const list = SVN_URL.split('/');
const SVN_NAME =  list[list.length - 1];
const UPDATE_PATH = path.resolve(__dirname, '..');

let arr = new Date().toLocaleString().split(' ');
let yearMonth = arr[0].replace(/-/g, '');
let time = arr[1].replace(/:/g, '').substring(0,4);
let fileName = `dist-${yearMonth}-${time}.zip`;


// 是否存在 压缩包指定目标目录/path
function isExist(){
	return new Promise( (resolve, reject) => {
		exec(`cd ${SVN_PATH}`, (error) => {
			if (error) resolve(false)
			resolve(true)
		})
	})
}
// 创建压缩包指定目标目录/path
function mkDir(){
	return new Promise( (resolve, reject) => {
		exec(`md ${SVN_PATH}`, (error) => {
			if (error) return console.error(error)
			console.log('mkDir---------------------- success')
			resolve(true)
		})
	})
}

function checkout(){
	return new Promise((resole, reject) => {
		exec(`svn checkout ${SVN_URL} ${SVN_NAME} --username ${userName}`,
			{ cwd: `${SVN_PATH}`},
			(error) => {
				if(error) return console.log(error)
				console.log("checkout success-----------------------")
				resole()
		})
	})
}

// 更新代码
function svnUpdata(){
	console.log('svnUpdata---------------------- start')
	return new Promise( (resolve, reject) => {
		exec(`svn update "${UPDATE_PATH}" `, (error) => {
			if (error) return console.error(err)
			console.log('svnUpdata---------------------- success')
			resolve()
		})
	})
}

// 生成md5的js文件 == 执行build命令 
function build(){
	return new Promise( (resolve, reject) => {
		exec(`node build/build.js`, (error) => {
			if (error) return console.error(err)
			console.log('buildJs--------------------- success')
			resolve()
		})
	})
}

// 打包规范： dist-20170828-1345.zip
function zip(){
	
	return new Promise( (resolve, reject) => {
		exec(`winrar a -r -ep1 ${SVN_PATH}/${SVN_NAME}/${fileName} ./dist/`, (error) => {
			if (error) return console.error(err)
			console.log('zip---------------------------- success')
			resolve()
		})
	})
}

	// 更新:压缩包 
function svnAdd(){
	return new Promise( (resolve, reject) => {
		exec(`svn add ${fileName} `, 
			{ cwd: `${SVN_PATH}\\${SVN_NAME}`},
			(error) => {
				if (error) return console.error(error)
				console.log('压缩包更新------------------------- success')
				resolve()
			})
	})
}

// 提交:压缩包 
function svnCommit(){
	return new Promise( (resolve, reject) => {
		exec(`svn commit  -m "test log message nokunokunoku"`, 
		{ cwd: `${SVN_PATH}\\${SVN_NAME}`},
			(error) => {
				if (error) return console.error(error)
				console.log('svnCommit------------------------- success')
				resolve('svnCommit')
		})
	})
}
		
co(function* (){
	let flag = yield isExist();
	if(!flag){
		yield mkDir()
		yield checkout()
	}
	yield svnUpdata()
	yield build()
	yield zip()
	yield svnAdd()
	yield svnCommit()
})
