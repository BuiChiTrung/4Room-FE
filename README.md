# frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Sử dụng VSP 
1. Vào VPS bằng ssh
```angular2html
// ssh key link   
https://drive.google.com/drive/folders/1XCNuXLq8WpIcX1pUEjDkohlHfmXZZHxq?usp=

chmod 400 <ssh_key_location>
ssh -i <ssh_key_location> straw-vm@20.211.188.23 
```

2. Thay đổi code Front 
```angular2html
cd home/straw-vm/Projects/4Room/4Room-Front-end
npm run build
```
3. Thay đổi code Back
```angular2html
cd home/straw-vm/Projects/4Room/4Room-BE
// ko cần build lại như front, code tự động update 
```


