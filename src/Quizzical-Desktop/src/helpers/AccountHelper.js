export const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const isPasswordValid = (password) => {
    let error = "";

    if (password.length < 8) {
        error = "Heslo musí mít alespoň 8 znaků";
        return { isValid: false, error };
    }
    if (password.length > 32) {
        error = "Heslo musí mít mezi 8 a 32 znaky";
        return { isValid: false, error };
    }
    if (!/[A-Z]/.test(password)) {
        error = "Heslo musí obsahovat alespoň jedno velké písmeno";
        return { isValid: false, error };
    }
    if (!/[a-z]/.test(password)) {
        error = "Heslo musí obsahovat alespoň jedno malé písmeno";
        return { isValid: false, error };
    }
    if (!/[0-9]/.test(password)) {
        error = "Heslo musí obsahovat alespoň jednu číslici";
        return { isValid: false, error };
    }
    const allowedSpecialCharacters = /[&@#*!?]/;
    if (!allowedSpecialCharacters.test(password)) {
        error = "Heslo musí obsahovat alespoň jeden speciální znak (&, @, #, *, !, ?)";
        return { isValid: false, error };
    }

    return { isValid: true, error: "" };
}
