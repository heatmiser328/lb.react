let defaultInfo = {
    version: '1.0.19',
    releasedate: new Date(2019,9,10,18,8,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
