const config = {
  appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL)
}
export default config

//the purpose of this file is ->
// ->sometimes import.meta.env.VITE_APPWRITE_URL may not load on time causing entire program to crash
// -->it may happen that import.meta.env.VITE_APPWRITE_URL value in env is not enclosed in "" which is alright usually since it is autoconverted to string as its a mix of characters and numbers like 178c8d0c
// but sometimes there may not be any characters which may convert its datatype as number which may cause problems when accessed in file during runtime,String() here ensures value is allways string