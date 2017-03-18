let defaultInfo = {
    version: '1.0.9',
    releasedate: new Date(2017,2,18,10,30,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
