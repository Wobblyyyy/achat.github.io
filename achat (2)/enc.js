var encjs = {
  encrypt: function(input)
  {
    var output = CryptoJS.AES.encrypt(input, ";,nj3FRS{ZW{`^Egn2Ve(D*A2`=LR$G?3kX4@~wUg.ub>49L>2ev8Ly``^xXBKYn*%Hj+Gg#sA])`xt.+f.czp)J$xBtRL:P{*gyxzdy_=cB(\n{xp:Zr+Y8=Dj!9SZ)");
    return output;
  },
  decrypt: function(input)
  {
    var output = CryptoJS.AES.decrypt(input, ";,nj3FRS{ZW{`^Egn2Ve(D*A2`=LR$G?3kX4@~wUg.ub>49L>2ev8Ly``^xXBKYn*%Hj+Gg#sA])`xt.+f.czp)J$xBtRL:P{*gyxzdy_=cB(\n{xp:Zr+Y8=Dj!9SZ)");
    output = output.toString(CryptoJS.enc.Utf8);
    return output;
  }
}