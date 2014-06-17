ALL: build

.PHONY: build watch node_modules clean

build: node_modules
	npm run build
	sass assets/style/scss/site.scss assets/style/css/site.css
	jekyll build

watch: node_modules
	./work.command

node_modules:
	npm install

clean:
	rm -f assets/style/scss/*
	rm -f assets/js/dist/*