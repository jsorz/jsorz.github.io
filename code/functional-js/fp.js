class Task{
  constructor(){
    this.plugins = {
      '*': []
    };
    this.pluginId = 0;
  }
  use(router, functor){
    if(typeof router === 'function'){
      [router, functor] = ['*', router];
    }
    this.plugins[router] = this.plugins[router] || [];
    this.plugins[router].push({
      functor,
      id: ++this.pluginId
    });
  }
  dispatch(router, ...args){
    let plugins = this.plugins['*'];
    if(router !== '*'){
      plugins = plugins.concat(this.plugins[router] || []);
    }
    plugins.sort((a, b) => a.id - b.id);

    let entrace = plugins
      .map(plugin => plugin.functor.bind(this, ...args))
      .reduceRight((a, b) => b.bind(this, a));

    entrace();
  }
}

// for test
let task = new Task();

task.use(function(req, res, next){
  console.log(req, res);
  next();
});

task.use('/', function(req, res, next){
  req.a++;
  res.x++;
  next();
});

task.use('/', function(req, res){
  console.log(req, res);
});

task.dispatch('/', {a: 1}, {x: 2});
