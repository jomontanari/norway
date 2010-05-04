load('/Library/Ruby/Gems/1.8/gems/jspec-4.1.0/lib/jspec.js');
load('/Library/Ruby/Gems/1.8/gems/jspec-4.1.0/lib/jspec.xhr.js');
load('/Library/Ruby/Gems/1.8/gems/jspec-4.1.0/lib/jspec.growl.js');
load('libs/mockit/mockit.js');
load('src/scripts/presenters/productsPresenter.js');
load('src/scripts/views/productsView.js');
load('src/scripts/models/productsService.js');

JSpec
.exec('spec/unit/productsPresenterSpec.js')
.run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures', failuresOnly: true })
.report()