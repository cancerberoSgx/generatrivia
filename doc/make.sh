#generation of htmls and pdf from docbook.
#author: sgurin

NAME=generatrivia
#clean
rm $NAME.pdf
rm -r $NAME-htmls
rm $NAME.tgz

#pdf
dblatex $NAME.xml

#multiple htmls
db2html $NAME.xml
cp -r images $NAME/images
mv $NAME $NAME-htmls
cp $NAME-htmls/t2.html $NAME-htmls/index.html
chmod -R a+x $NAME-htmls

tar cvfz $NAME-htmls.tgz $NAME-htmls
db2html --nochunks $NAME.xml > $NAME.html
