import xml.etree.ElementTree as ET
import sys


name = sys.argv[1]
tilted = False
size = "0,0"
tree = ET.parse('%s.xml' % name)
sys.stdout.write('var %s = {complexClassifiers:[' % name)
root = tree.getroot()
for n in root:
    size = n.find('size').text.replace(' ', ',')
    stages = n.find('stages')
    ccs = ''
    for s in stages:
        sys.stdout.write('%s{simpleClassifiers:[' % (ccs))
        trees = s.find('trees')
        scs = ''
        for t2 in trees:
            sys.stdout.write('%s{features:[' % scs)
            scs = ','
            for t in t2:
                feature = t.find('feature')
                scf = ''
                for r in feature.find('rects'):
                    sys.stdout.write('%s[%s]' % (scf, r.text.replace(' ', ',')))
                    scf = ','
                tilted = tilted | (feature.find('tilted').text == '1')
                threshold = t.find('threshold').text
                right_val = t.find('right_val').text
                left_val = t.find('left_val').text
                sys.stdout.write('],threshold:%s,right_val:%s,left_val:%s}' % (threshold, right_val, left_val))
        sys.stdout.write(']}')
        ccs = ','
sys.stdout.write('],size:[%s],tilted:%s};\n' % (size, 'true' if tilted else 'false'))
sys.stdout.flush()