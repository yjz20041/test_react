var longestCommonSubsequence = function(text1, text2) {
    if (!text1 || !text2) return 0;
    const dp = [];
    for (let i = 0; i < text1.length; i++) {
        dp.push([]);
    }

    for (let i = 0; i < text1.length; i++) {
        for (let j = 0; j < text2.length; j++) {
            dp[i][j] = text1[i] === text2[j] ? ((dp[i - 1] || [])[j - 1] || 0) + 1 : 
            Math.max( (dp[i - 1] || [])[j] || 0, dp[i][j-1] || 0, 0 )
        }
    }
    return dp[text1.length - 1][text2.length - 1];
};