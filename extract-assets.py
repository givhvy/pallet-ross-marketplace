from pathlib import Path
import cv2
import numpy as np

root = Path(__file__).parent
reference = root.parent / 'video-ui-reference'
out = root / 'public/assets'
def crop(source, name, box):
    im = cv2.imread(str(reference / (source + '.png')))
    x,y,w,h = box
    cv2.imwrite(str(out / (name + '.webp')), im[y:y+h,x:x+w], [cv2.IMWRITE_WEBP_QUALITY,95])

im = cv2.imread(str(reference / 'start.png'))
quads = [
 [(296,613),(491,576),(535,774),(334,812)],
 [(433,564),(632,537),(662,736),(461,762)],
 [(575,573),(775,555),(790,755),(592,774)],
 [(698,562),(903,563),(901,766),(697,764)],
 [(823,554),(1026,568),(1010,770),(808,757)],
 [(957,561),(1160,581),(1140,784),(938,764)],
 [(1101,552),(1303,589),(1267,791),(1067,755)]
]
for i,quad in enumerate(quads):
    transform = cv2.getPerspectiveTransform(np.float32(quad),np.float32([[0,0],[400,0],[400,400],[0,400]]))
    cv2.imwrite(str(out/f'hero-{i}.webp'), cv2.warpPerspective(im,transform,(400,400)),[cv2.IMWRITE_WEBP_QUALITY,95])
for i,box in enumerate([(164,274,165,275),(568,448,120,277),(692,536,169,273),(870,584,168,269),(1043,710,166,269),(1219,798,214,220)]):
    crop('cards',f'poster-{i}',box)
crop('banner','class-portrait',(190,610,1218,350))
crop('story','eye',(813,651,536,290))
crop('story','prada',(450,602,168,216))
for i,box in enumerate([(235,248,154,184),(441,195,171,221),(980,250,175,167),(1210,250,155,185),(235,524,154,196),(441,510,168,225),(990,510,164,225),(1210,525,154,195),(235,810,151,190),(443,829,167,194),(708,871,182,151),(983,827,171,195),(1210,810,154,191)]):
    crop('portraits',f'person-{i}',box)
crop('portraits','artist',(700,460,272,300))
