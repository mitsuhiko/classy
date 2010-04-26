.PHONY: upload-docs

all: upload-docs

upload-docs:
	$(MAKE) -C docs html
	scp -r docs/_build/html/* pocoo.org:/var/www/classy.pocoo.org/
