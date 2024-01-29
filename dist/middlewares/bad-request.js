export const ErrorTest = async (error, req, res) => {
    console.log('HERE?');
    return res.status(400).json({ error });
};
//# sourceMappingURL=bad-request.js.map