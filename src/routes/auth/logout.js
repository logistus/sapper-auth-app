export async function post(req, res) {
    delete req.session.token;
    res.clearCookie('connect.sid');
    res.json({"ok": true});
}