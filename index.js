/* eslint-disable no-bitwise */

import fs, {promises as fsPromises} from 'node:fs';
import process from 'node:process';

const isExe = (mode, gid, uid) => {
	if (process.platform === 'win32') {
		return true;
	}

	const isGroup = gid ? process.getgid && gid === process.getgid() : true;
	const isUser = uid ? process.getuid && uid === process.getuid() : true;

	return Boolean((mode & 0o0001)
		|| ((mode & 0o0010) && isGroup)
		|| ((mode & 0o0100) && isUser));
};

const executable = name => {
	if (typeof name !== 'string') {
		return Promise.reject(new TypeError('Expected a string'));
	}

	return fsPromises.stat(name).then(stats => stats && stats.isFile() && isExe(stats.mode, stats.gid, stats.uid));
};

executable.sync = name => {
	if (typeof name !== 'string') {
		throw new TypeError('Expected a string');
	}

	const stats = fs.statSync(name);

	return stats && stats.isFile() && isExe(stats.mode, stats.gid, stats.uid);
};

executable.checkMode = isExe;

export default executable;
