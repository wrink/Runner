var run = function (url, args, callback, callbackOnErr) {
	var out = function (exit, call, inp, err) {
		return {
			"exitCode": exit,
			"callbackReturn": call,
			"inputArray": inp,
			"errorArray": err
		};
	};

	imports = new JavaImporter(java.net, java.io, java.lang.Runtime)
	with(imports) {
		//var input = new BufferedReader(new InputStreamReader(new URL(url).openStream()));
		var input = new DataInputStream(new URL(url).openStream());

		var name = url.split('/');
		name = name[name.length - 1];

		var holder;
		//var contents = input.readLine();
		//while((holder = input.readLine()) !== null) contents += '\n' + holder;
		var contents = [];
		var holder;
		try {
			while ((holder = input.readByte()) !== undefined) {
				contents.push(holder);
			}
		} catch (e) {
			if (e instanceof EOFException) {
				print("done reading")
			} else {
				tmp.delete();

				return out(2, null, [], e.toString().split('\n'))
			}
		}

		var tmp = File.createTempFile(name, '.tmp');
		tmp.setExecutable(true);

		//var writer = new FileWriter(tmp);
		var writer = new FileOutputStream(tmp);
		writer.write(contents);
		writer.flush();
		writer.close();

		try {
			var process = Runtime.getRuntime().exec([tmp.getAbsolutePath()].concat(args || []));
			process.waitFor();

			input = new BufferedReader(new InputStreamReader(process.getInputStream()));
			error = new BufferedReader(new InputStreamReader(process.getErrorStream()));

			var errFlag = false;

			var inputArray = [];
			var errorArray = [];

			while ((holder = input.readLine()) !== null) {
				print(holder);
				inputArray.push(holder);
			}
			while ((holder = error.readLine()) !== null) {
				errFlag = true;

				print(holder);
				errorArray.push(holder);
			}

			tmp.delete();

			if (errFlag) {
				if (callback && callbackOnErr) return out(1, callback(out(1, null, inputArray, errorArray)), inputArray, errorArray);
				else return out(1, null, inputArray, errorArray);
			} else {
				if (callback) return out(0, callback(out(0, null, inputArray, [])), inputArray, []);
				else return out(0, null, inputArray, []);
			}
		} catch (e) {
			print(e);

			tmp.delete();

			if (callback && callbackOnErr) return out(3, callback(out(3, null, [], e.toString().split('\n'))), [], e.toString().split('\n'));
			else return out(3, null, [], e.toString().split('\n'));
		}
	}
};
