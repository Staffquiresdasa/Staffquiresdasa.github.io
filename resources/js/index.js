document.addEventListener("DOMContentLoaded", (e => {
    var t;
    wpcf7_recaptcha = {...null !== (t = wpcf7_recaptcha) && void 0 !== t ? t : {}};
    const c = wpcf7_recaptcha.sitekey, {homepage: n, contactform: a} = wpcf7_recaptcha.actions, o = e => {
        const {action: t, func: n, params: a} = e;
        grecaptcha.execute(c, {action: t}).then((e => {
            const c = new CustomEvent("wpcf7grecaptchaexecuted", {detail: {action: t, token: e}});
            document.dispatchEvent(c)
        })).then((() => {
            "function" == typeof n && n(...a)
        })).catch((e => console.error(e)))
    };
    if (grecaptcha.ready((() => {
        o({action: n})
    })), document.addEventListener("change", (e => {
        o({action: a})
    })), "undefined" != typeof wpcf7 && "function" == typeof wpcf7.submit) {
        const e = wpcf7.submit;
        wpcf7.submit = (t, c = {}) => {
            o({action: a, func: e, params: [t, c]})
        }
    }
    document.addEventListener("wpcf7grecaptchaexecuted", (e => {
        const t = document.querySelectorAll('form.wpcf7-form input[name="_wpcf7_recaptcha_response"]');
        for (let c = 0; c < t.length; c++) t[c].setAttribute("value", e.detail.token)
    }))
}));