const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('[your tests start from here]', () => {
  it('[atom]', async () => {
    app.mockSession({});

    // atomClass info
    const atomClassModule = mockInfo().relativeName;
    const atomClassName = 'post';

    // login as root
    await app.httpRequest().post(mockUrl('/a/authsimple/passport/a-authsimple/authsimple')).send({
      auth: 'root',
      password: '123456',
    });

    // create
    let result = await app.httpRequest().post(mockUrl('/a/base/atom/create')).send({
      atomClass: { module: atomClassModule, atomClassName, atomClassIdParent: 0 },
    });
    assert(result.body.code === 0);
    const atomKey = result.body.data;

    // submit
    result = await app.httpRequest().post(mockUrl('/a/base/atom/submit')).send({
      key: atomKey,
      item: {
        atomName: 'test',
        description: 'this is a test',
      },
    });
    assert(result.body.code === 0);

    // read
    result = await app.httpRequest().post(mockUrl('/a/base/atom/read')).send({
      key: atomKey,
    });
    assert(result.body.code === 0);

    // delete
    result = await app.httpRequest().post(mockUrl('/a/base/atom/delete')).send({
      key: atomKey,
    });
    assert(result.body.code === 0);

  });
});
