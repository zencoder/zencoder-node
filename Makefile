test:
	npm test

coverage:
	jscoverage lib lib-cov
	ZENCODER_NODE_COV=1 mocha -R html-cov > coverage.html
	rm -rf lib-cov

coveralls:
	jscoverage lib lib-cov
	ZENOCDER_NODE_COV=1 ./node_modules/.bin/mocha test -R mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js
	rm -rf lib-cov

.PHONY: test