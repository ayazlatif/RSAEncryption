// TODO refactor to use nodejs to do serverside calculations
function decrypt(e, n) {
   function phi(n) {

      // compute prime factorization of n
      var search = n;
      var factors = [];
      var count = 0;
      while (n % 2 == 0) {
         count++;
         n /= 2;
      }
      if (count > 0) {
         factors.push([2, count]);
      }
      // storing [p1^e1,p2^e2...]
      for (var i = 3; i <= Math.sqrt(search); i += 2) {
         count = 0;
         while (n % i == 0) {
            count++;
            n /= i;
         }
         if (count > 0) {
            factors.push([i, count]);
         }
      }
      if (n > 2) {
         factors.push([n, 1]);
      }

      // phi(n) = phi(p1)phi(p2)...phi(pn)
      // phi(pi) = (pi^ei - pi^(ei - 1))
      var result = 1;
      for (var i = 0; i < factors.length; i++) {
         var num = factors[i];
         console.log(num);
         result *= (Math.pow(num[0], num[1]) - Math.pow(num[0], num[1] - 1));
      }
      return result;
   }

   // return format is [b = rx + sy] ==> [b, x, y]  
   function extendedEuclid(a, b) {
      a = +a;
      b = +b;
      if (a !== a || b !== b) {
         return [NaN, NaN, NaN];
      }

      if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) {
         return [Infinity, Infinity, Infinity];
      }
      // Checks if a or b are decimals
      if ((a % 1 !== 0) || (b % 1 !== 0)) {
         return false;
      }
      var signX = (a < 0) ? -1 : 1,
         signY = (b < 0) ? -1 : 1,
         x = 0,
         y = 1,
         u = 1,
         v = 0,
         q, r, m, n;
      a = Math.abs(a);
      b = Math.abs(b);

      while (a !== 0) {
         q = Math.floor(b / a);
         r = b % a;
         m = x - u * q;
         n = y - v * q;
         b = a;
         a = r;
         x = u;
         y = v;
         u = m;
         v = n;
      }
      return [b, signX * x, signY * y];
   }

   // if d is negative will find a positive d to 
   // work
   function findPositiveD(d, y) {
      while (d < 0) {
         d += y;
      }
      return d;
   }

   var phiOfN = phi(2747);
   console.log("phi(n) = " + phiOfN)
   var d = extendedEuclid(13, phiOfN)[1];
   d = findPositiveD(d, phiOfN);
   var cyphers = [2206]

   for (var i = 0; i < cyphers.length; i++) {
      var c = cyphers[i];
      // efficient exponentiation with large numbers
      alert(c + "^" + d);
      alert(Math.pow(c, d));
   }


}
