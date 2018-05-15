/**
 * Created by yunrui001 on 2018-03-28.
 */
// 最大公约数
function gcd(p, q) {
  if (q === 0) {
    return p
  }
  var r = p % q
  return gcd(q, r)
}


//console.log(gcd(38, 190))

// 汉诺塔 a =》 c

function hnt(a, b, c, num) {
  if (num === 1) {
    console.log(`${a}=>${c}`)
    return
  }
  hnt(a, c, b, num - 1)
  console.log(`${a}=>${c}`)
  hnt(b, a, c, num - 1)
}

//hnt('a', 'b', 'c', 64)

//冒泡排序
function sort(arr) {
  let length = arr.length
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if (arr[i] > arr[j]) {
        let temp = arr[j]
        arr[j] = arr[i]
        arr[i] = temp
      }
    }
  }
}
/*var arr = [1, 52, 12, 3, 5, 68, 41, 2, 35]
 sort(arr)
 console.log(arr)*/

// 快排
function quick(arr, start = 0, end = arr.length - 1) {
  if (start != end) {
    let middle = arr[start]
    for (var i = start, j = end; i < j; i++) {
      if (arr[i] > middle) {
        for (; i < j; j--) {
          if (arr[j] < middle) {
            let temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
            break
          }
        }
      }
    }
    if (middle > arr[j]) {
      let temp = arr[j]
      arr[j] = middle
      arr[start] = temp
    }
    quick(arr, start, j - 1)
    quick(arr, j, end)
  }
}

/*var arr = [938, 944, 2670, 6570, 7322, 1212, 2880, 2960, 2195, 4138, 1820, 6570, 7628, 8949, 3945, 738, 507, 6584, 6357, 3094, 7884, 9215, 8682, 5039, 9732, 1897, 7768, 4471, 2664, 35, 6257, 2898, 797, 1773, 2029, 4944, 3583, 74, 4570, 8172, 1762, 6923, 813, 8647, 485, 9944, 7988, 7038, 564, 7450, 4574, 6555, 738, 2331, 3664, 9151, 3358, 8152, 5426, 4645, 9079, 1512, 7392, 7452, 2899, 7804, 6144, 4714, 9394, 2831, 5679, 9235, 7363, 1070, 1116, 3414, 2769, 3315, 7189, 7704, 7596, 6911, 8219, 2860, 2129, 8449, 2896, 9505, 9895, 3610, 3239, 8120, 1442, 1495, 4705, 8203, 1292, 2262, 779, 1872, 8162, 731, 7853, 6479, 198, 8857, 2988, 8683, 5969, 7749, 38, 1321, 9223, 5683, 6933, 2644, 700, 9716, 9409, 1329, 8645, 4873, 9625, 4066, 3253, 4229, 6866, 9495, 4506, 9085, 8363, 7964, 3542, 1, 1383, 2616, 9436, 139, 479, 7569, 5743, 2035, 293, 7603, 7013, 2104, 8746, 4451, 2711, 76, 7655, 6195, 5342, 9308, 9214, 9390, 2329, 5636, 7020, 7716, 8909, 431, 9749, 2364, 9267, 3249, 789, 9162, 1244, 7079, 8295, 2092, 7610, 6198, 9907, 6827, 7720, 2218, 7697, 4152, 4815, 9339, 7558, 6228, 5139, 5567, 2755, 8229, 2095, 8134, 4060, 7130, 9426, 2251, 380, 5591, 3260, 5837, 6336, 3023, 4770, 6931, 3356, 6082, 3586, 4308, 970, 44, 5886, 9945, 744, 8499, 7018, 2878, 4544, 7360, 4022, 9979, 4804, 2859, 6056, 510, 6717, 7708, 397, 2817, 1607, 1404, 8510, 2709, 534, 1512, 9559, 9471, 7110, 9904, 6305, 5981, 9828, 8864, 6253, 7684, 5315, 5262, 5942, 9230, 2403, 1028, 7193, 8285, 4226, 211, 7509, 5435, 4727, 5147, 7043, 2283, 9464, 3806, 3447, 6479, 2251, 3656, 1646, 7097, 6659, 1626, 2208, 6731, 4870, 3606, 2447, 1743, 5519, 6770, 8568, 9252, 1609, 4940, 8739, 6532, 1818, 5820, 4271, 3068, 3571, 5460, 1409, 1366, 6962, 3396, 3032, 8216, 1543, 4644, 2861, 3748, 6896, 5979, 4603, 9506, 9200, 5661, 9092, 8028, 6706, 3470, 9597, 2758, 2209, 3016, 3060, 6958, 2173, 6880, 9699, 1039, 1828, 4324, 7689, 5836, 3336, 8133, 8707, 3123, 7667, 7168, 9436, 8163, 7179, 4107, 5708, 2402, 2435, 9126, 477, 7945, 9644, 3368, 911, 3227, 8996, 1810, 5021, 4352, 9284, 484, 7222, 6660, 3436, 4281, 5763, 3194, 3031, 2817, 1237, 8962, 5977, 9461, 8793, 1672, 8970, 4016, 3640, 2991, 9436, 6840, 4895, 4029, 7942, 8803, 6790, 6402, 3177, 9991, 7954, 2801, 5127, 9066, 7330, 6974, 6619, 2077, 9787, 6650, 4811, 8168, 9640, 3384, 3198, 1007, 7834, 365, 7390, 9610, 5110, 9499, 2534, 8626, 2099, 7682, 7713, 9942, 7782, 4104, 1938, 8973, 7822, 9367, 5210, 8862, 2961, 1060, 2820, 733, 8082, 7902, 8762, 9006, 9875, 3225, 9159, 3942, 1257, 4226, 8712, 1304, 1535, 9851, 9428, 1227, 2205, 4110, 4116, 403, 851, 7512, 8076, 1516, 3485, 1877, 1490, 6545, 766, 2040, 7712, 5926, 950, 1321, 9751, 9208, 5936, 2657, 7759, 8759, 7458, 6323, 4432, 8002, 5309, 1220, 7881, 1068, 9294, 231, 8594, 7278, 6527, 7042, 2821, 3875, 2535, 98, 4268, 2602, 8937, 5568, 686, 9574, 7742, 3147, 6065, 4526, 4558, 8528, 8018, 8337, 7821, 7049, 7984, 2577, 3516, 9057, 5059, 660, 4476, 5662, 5488, 327, 4065, 776, 9139, 1005, 6176, 8161, 900, 718, 1002, 3049, 9696, 6446, 5763, 9371, 9101, 6250, 9795, 2653, 1557, 5008, 3042, 3495, 8219, 6312, 5777, 3231, 3903, 2451, 4840, 8977, 5495, 6272, 7105, 8196, 2502, 2738, 4415, 8151, 6336, 1579, 8872, 2972, 4383, 6544, 4542, 5610, 6229, 1229, 6423, 927, 2288, 316, 3770, 7887, 3428, 1875, 8667, 2891, 1477, 3754, 5050, 5396, 1749, 6705, 2193, 1072, 311, 2426, 1475, 3961, 1543, 9565, 3328, 7894, 7326, 4542, 9289, 5477, 987, 7092, 9009, 7248, 5484, 3733, 8939, 6435, 8305, 8647, 5747, 36, 309, 6680, 4421, 324, 3536, 3298, 2688, 3530, 7397, 2979, 166, 9733, 6520, 8442, 8082, 7548, 9896, 4331, 7280, 2681, 5317, 6166, 9913, 3158, 8616, 2491, 9443, 4599, 926, 4927, 3734, 9725, 536, 2518, 5116, 9934, 6458, 6233, 426, 375, 6959, 5502, 2330, 3706, 8440, 8977, 7717, 7819, 5969, 4197, 4071, 9526, 6536, 3342, 8864, 5223, 9155, 2313, 179, 4309, 6969, 2607, 831, 7467, 1937, 5287, 3028, 335, 601, 6032, 827, 5905, 4842, 4733, 6937, 3465, 1254, 9437, 4021, 6220, 2452, 3052, 4133, 8085, 6499, 9641, 2883, 2944, 4869, 2736, 8783, 1713, 3306, 3508, 3187, 1479, 355, 8653, 1990, 8811, 997, 7353, 5853, 4411, 8450, 3519, 2899, 2481, 5415, 6338, 7777, 3748, 4605, 6199, 6742, 2716, 2418, 5734, 6689, 7202, 3306, 9687, 7532, 5819, 5191, 3590, 3156, 6631, 2820, 9020, 5379, 5571, 3074, 1677, 2651, 5061, 2974, 8821, 1950, 6563, 7315, 3257, 9695, 9188, 7175, 3100, 6663, 9167, 2398, 8141, 2970, 3398, 2612, 1950, 6112, 8011, 8339, 1733, 4625, 6682, 6805, 5990, 6344, 5897, 1365, 3646, 7252, 9093, 9473, 3399, 6171, 9301, 5405, 1977, 9939, 8360, 758, 7158, 7254, 616, 2770, 6421, 1874, 1515, 3011, 5909, 6889, 9408, 8618, 2417, 7217, 319, 8527, 9004, 4102, 4352, 6506, 4250, 3110, 1573, 6433, 4287, 1534, 3418, 2554, 232, 2293, 2067, 357, 4240, 3303, 9886, 5841, 6235, 9870, 5561, 2484, 8759, 2481, 6708, 4266, 4082, 5247, 9133, 8875, 2275, 7695, 944, 3964, 5816, 5504, 2263, 4096, 8952, 950, 1264, 1845, 5957, 6993, 9662, 3547, 3067, 2521, 7460, 7113, 1227, 3191, 9026, 571, 1482, 4365, 6245, 4346, 8441, 5431, 1728, 6093, 3660, 6929, 459, 9643, 8516, 5788, 2878, 4836, 8550, 5814, 9526, 3024, 5871, 966, 6310, 501, 9297, 1527, 4897, 758, 3530, 6379, 9890, 9022, 66, 6418, 5912, 562, 491, 7378, 2578, 1635, 8516, 8107, 7140, 7197, 818, 4051, 4609, 6300, 5779, 6693, 8841, 7317, 7402, 6852, 4113, 6068, 1082, 7341, 2162, 5885, 1712, 9952, 2525, 9545, 1611, 3688, 3446, 2832, 3840, 4894, 2982, 9643, 581, 7210, 935, 7455, 2678, 1255, 6572, 4335, 4178, 7739, 2593, 149, 1442, 8260, 8514, 1514, 1975, 7399, 9500, 7177, 5006, 3170, 8167, 5435, 4130, 1275, 294, 4867, 4881, 5174, 2570, 2053, 4058, 769, 4672, 7598, 5607, 4291, 3336, 8951, 1067, 9190, 7694, 3880, 8430, 4160, 656, 8268, 1751, 7884, 5732, 8426, 7521, 9370, 8717, 8942, 6618, 2455, 8768, 2842, 9500, 8555, 3938, 6278, 1440, 2141, 1819, 4650, 8152, 7665, 3642, 6265, 1447, 6265, 7281, 2346, 6297, 8420, 2723, 9900, 5515, 6998, 5691, 4767, 3506, 9946, 7250, 8989, 6869]
 quick(arr)
 console.log(arr)*/

function BST() {
  class Node {
    constructor(v) {
      this.value = v
      this.left = undefined
      this.right = undefined
    }
  }
  this.root = undefined

  this.insert = function (e) {
    function _insert(root, e) {
      if (root === undefined) {
        root = new Node(e)
      } else if (root.value > e) {
        _insert(root.left, e)
      } else {
        _insert(root.right, e)
      }
    }
    _insert(this.root, e)
  }
}

var bst = new BST();
[5, 1, 2, 3, 12, 4, 7].forEach(e => {
  bst.insert(e)
})

console.log(JSON.stringify(bst))
//console.log(JSON.stringify(tree([5, 1, 2, 3, 12, 4, 7])))

/*function Avl() {
 class Node {
 constructor() {
 this.val = undefined
 this.left = null
 this.right = null
 this.height = 0
 }
 }

 this.root = new Node()
 this.LL = function () {

 }
 this.push = function (e) {

 }
 }*/

