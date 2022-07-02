### AT+CMGL Output Reader

This is a command line tool that reads the output of AT+CMGL command.

---

Sample output file:

```text
AT+CMGL="ALL"
+CMGL: 1,"REC READ","+5511388382882","","22/05/05,16:04:23+08"
00480065006C006C006F00200077006F0072006C0064002000C1
+CMGL: 2,"REC UNREAD","+5511388382882","","22/05/10,13:54:14+08"
Essa eh a segunda mensagem
+CMGL: 3,"REC UNREAD","+551130872258","","22/05/30,19:37:01+08"
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...
OK
```
# Usage:

## (with docker <3)
### Requirements
- docker

```bash
docker run janrsilva/parse-sms
```


## (without docker)
### Requirements
- node.js v14.0.0 or higher
- npm


### How to install:

- install with yarn or npm

```bash
yarn
```
or
```bash
npm i
```

### How to run:

- you need give execute permission to the file `parse-sms`

```bash
chmod +x parse-sms
```

- run the file `parse-sms` with some AT+CMGL output file
```bash
./parse-sms ./sms-example.txt
```

   - if you prefer you can give multiple files as arguments
```bash
./parse-sms ./sms-example.txt ./sms-example2.txt ...
```

### Tests

```bash
yarn test
```
or
```bash
npm run test
```
