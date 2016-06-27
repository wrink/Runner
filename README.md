# Runner  
A URL-based script runner for Nashorn and Rhino  

## How to use Runner  
Using Runner couldn't be easier. Simply insert the following line into any JS script running on the Java virtual machine to import Runner  
`load(https://raw.githubusercontent.com/wrink/Runner/master/Runner.js);`  
From there on out, all you need to do in order to run an external script is call the `run()` method  

## Language Support
The following languages are supported on Runner by default. Other languages should work provided the proper interpreters are installed on your computer
	-	bash
	-	python 2.7
	-	ruby
	-	perl
	-	C
	-	C++
	-	assembly

## Documentation  
`Function:  run(url, [args], [callback], [callbackOnErr])`  
The run method is will run almost any executable code from a URL and will return an **Out** object  
**Arguments:**  
`String: url` the url of the executable file you wish to run.  
`Array: args` (optional) an array of any and all arguments you wish to run along with the executable. Note that only strings and numbers work properly  
`Function: callback` (optional) this function will run when the process terminates successfully. It can accept an optional **Out** object as an argument  
`Boolean: callbackOnErr`: (optional) if set to True, the callback will run regardless of whether or not the process terminated successfully.  

`Object: Out`  
**Properties:**  
`Number: exitCode` an integer that tells the success or failure of the process  
	**0.**	Success: executable ran successfully  
	**1.**	Error: The executable itself threw an error and terminated  
	**2.**	Failure: the executable could not be read  
	**3.**	Failure: the executable failed to execute  
`Any: callbackReturn` the return statement of the provided callback. It is set to NULL if no callback is provided  
`Array: inputArray`	contains the executable's STDOUT, divided by line.  
`Array: errorArray` contains the executable's STDERR, divided by line.  
