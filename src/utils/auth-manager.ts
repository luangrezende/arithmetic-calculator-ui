export const getTokens = () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    return { token, refreshToken };
};

export const saveTokens = (token: string, refreshToken: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
};

export const logout = () => {
    localStorage.clear();
    window.location.href = "/sign-in";
};
