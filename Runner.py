from java.io import BufferedReader, InputStreamReader, File, FileOutputStream, DataInputStream, EOFException
from java.net import URL
from java.lang import Runtime

def run(string, args=[], callback=None, callbackOnErr=False):
	def out (exit, call, inp, err):
		return {
			"exitCode": exit,
			"callbackReturn": call,
			"inputArray": inp,
			"errorArray": err
		}

	tmp = File.createTempFile('tmp', None)

	tmp.setExecutable(True)

	writer  = FileOutputStream(tmp);
	writer.write(string)
	writer.flush()
	writer.close()

	try:
		process = Runtime.getRuntime().exec([tmp.getAbsolutePath()] + ([str(i) for i in args] or []))
		process.waitFor()

		inp = BufferedReader(InputStreamReader(process.getInputStream()))
		err = BufferedReader(InputStreamReader(process.getErrorStream()))

		errFlag = False
		inputArray = []
		errorArray = []

		holder = inp.readLine()
		while holder != None:
			print holder
			inputArray += [holder]
			holder = inp.readLine()

		holder = err.readLine()
		while holder != None:
			errFlag = True
			errorArray += [holder]
			holder = err.readLine()

		tmp.delete()

		if errFlag:
			if callback and callbackOnErr: return out(1, callback(out(1, None, inputArray, errorArray)), inputArray, errorArray)
			else: return out(1, None, inputArray, errorArray)
		else:
			if callback: return out(0, callback(out(0, None, inputArray, [])), inputArray, [])
			else: return out(0, None, inputArray, [])
	except Exception as e:
		print str(e)

		tmp.delete()

		if callback and callbackOnErr: return out(3, callback(out(3, None, [], str(e).split("\n"))), [], str(e).split("\n"))
		else: return out(3, None, [], str(e).split("\n"))

def runURL(url, args=[], callback=None, callbackOnErr=False):
	inp = DataInputStream(URL(url).openStream());

	contents = [];
	try:
		holder = inp.readByte()
		while holder != None:
			contents += [holder]
			holder = inp.readByte()
	except EOFException:
		pass
	except Exception as e:
		print str(e)
		return out(2, None, [], str(e).split("\n"))

	return run(contents, args, callback, callbackOnErr)
