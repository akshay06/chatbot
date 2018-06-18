function makeViewModel() {
	echo $1
	mkdir $1
	cd $1
	touch $1.controller.js
	echo "class "$1"Ctrl {
	  constructor() {
	  }
	}
	
	export default "$1"Ctrl;" >> $1.controller.js
	touch $1.js
	echo "import angular from 'angular';
	import uiRouter from 'angular-ui-router';
	
	import Ctrl from './"$1".controller';
	import template from './"$1".html';
	
	const Module = angular.module('', [
	  uiRouter,
	]);

	Module
	  .config(($stateProvider) => {
	    $stateProvider
	      .state('', {
	        url: '/',
		 template: '<"$1"-view-model></"$1"-view-model>',
	        parent: "",
	      });
	  });
	
	class Component {
	  constructor() {
	    this.restrict         = 'AE';
	    this.scope            = {};
	    this.template         = template;
	    this.controller       = Ctrl;
	    this.controllerAs     = 'Ctrl';
	    this.bindToController = true;
	  }
	}

	Module.directive('"$1"ViewModel', () => new Component);

	export default Module;" >> $1.js
	touch $1.html
}

function makeService () {
	echo $1
	mkdir $1
	cd $1
	touch $1.service.js
	echo "class "$1"Service {
    constructor() {
        
    }
}

export default "$1"Service;
" >> $1.service.js
    touch "$1".js
    echo "import angular from 'angular';
import "$1"Service from './"$1".service';

const module = angular.module('', []);

module.service('"$1"Service', "$1"Service);

export default module;" >> $1.js
}

function makeDirective () {
	echo $1
	mkdir $1
	cd $1
	touch $1.controller.js
	echo "export class "$1"Controller {
  constructor() {
    
  }

}" >> $1.controller.js
    touch $1.js
	echo "import angular from 'angular';
import {
  "$1"Controller,
}
from './"$1".controller';
import template from './"$1".html';

export default angular
  .module('', [])
  .component('"$1"', {
    bindings: {},
    controller: "$1"Controller,
    template: template(),
  });
" >> $1.js
    touch $1.html
}

function makeComponent () {
	echo $1
	mkdir $1
	cd $1
	touch $1.tsx
	echo "import * as React from 'react'
import { connect } from 'react-redux'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as cmn from '../../../styles/common.scss';
import * as st from './$1.scss';


type Props = {
    dispatch: any,
}

declare let window: any;
class $1 extends React.Component<Props, any> {
    componentDidMount() {
        
    }
    render() {
        return (
            <div>
                <Header />
                <div className={cmn.containerHeight}>

                </div>
                <Footer />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch: dispatch
    }
}

const mapStateToProps = (state, ownProps: any) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)($1)
" >> $1.tsx
touch $1.scss
echo ".test {color: black}" >> $1.scss
touch $1.scss.d.ts
echo "export const test: string;" >> $1.scss.d.ts

}
if [ "$1" = "view-model" ]
then
	echo "$1"
	echo "$2"
	makeViewModel $2
elif [ "$1" = "service" ]
then
	makeService $2
elif [ "$1" = "directive" ]
then
	makeDirective $2
elif [ "$1" = "makeComponent" ]
then
	makeComponent $2
fi