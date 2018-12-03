
function decrypt(e, n) {
   function phi(n) {
      var search = n;
      var factors = [];
      while (n % 2 == 0) {
         factors.push(2);
         n /= 2;
      }
      for (var i = 3; i <= Math.sqrt(search); i += 2) {
         while (n % i == 0) {
            console.log(i);
            factors.push(i);
            n /= i;
         }
      }
      if (n > 2) {
         factors.push(n);
      }

      var result = 1;
      for (var i = 0; i < factors.length; i++) {
         result *= (factors[i] - 1);
      }
      return result;
   }
   var phiOfN = phi(2747);
   alert(phiOfN);

}
