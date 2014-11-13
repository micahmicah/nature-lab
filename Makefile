ALL: build

.PHONY: build watch node_modules clean

build: node_modules
	npm run build

node_modules:
	npm install