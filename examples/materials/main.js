( function () {
    'use strict';

    var OSG = window.OSG;
    var osg = OSG.osg;
    var osgDB = OSG.osgDB;
    var osgViewer = OSG.osgViewer;
    var $ = window.$;


    var Example = function () {


        this._textureNames = [
            'seamless/fabric1.jpg',
            'seamless/fabric2.jpg',
            'seamless/bricks1.jpg',
            'seamless/grunge1.jpg',
            'seamless/grunge2.jpg',
            'seamless/leather1.jpg',
            'seamless/wood1.jpg',
            'seamless/wood2.jpg',
            'alpha/alpha.png'
        ];


        this._config = {

            materialEmission1: '#090909',
            materialAmbient1: '#3b2fe6',
            materialDiffuse1: '#f0f0f0',
            materialSpecular1: '#505050',
            materialShininess1: 0.5,

            materialEmission2: '#050505',
            materialAmbient2: '#050505',
            materialDiffuse2: '#f0f0f0',
            materialSpecular2: '#505050',
            materialShininess2: 0.3,
            texture2Unit0: this._textureNames[5],

            materialEmission3: '#050505',
            materialAmbient3: '#050505',
            materialDiffuse3: '#f0f0f0',
            materialSpecular3: '#505050',
            materialShininess3: 0.4,
            texture3Unit0: this._textureNames[2],
            texture3Unit1: this._textureNames[1],

            materialEmission4: '#050505',
            materialAmbient4: '#050505',
            materialDiffuse4: '#f0f0f0',
            materialSpecular4: '#505050',
            materialShininess4: 0.3,
            materialTransparency4: 0.5,
            texture4Unit0: this._textureNames[6],


            materialEmission5: '#050505',
            materialAmbient5: '#050505',
            materialDiffuse5: '#f0f0f0',
            materialSpecular5: '#505050',
            materialShininess5: 0.4,
            materialTransparency5: 0.5,
            texture5Unit0: this._textureNames[this._textureNames.length -1 ],
            texture5Unit1: this._textureNames[1]

        };



        this._stateSet1 = undefined;

    };

    Example.prototype = {

        initDatGUI: function () {

            var path = '../media/textures/';

            // generate array of paths
            var paths = this._textureNames.map( function ( name ) {
                return path + name;
            } );

            // generate array of promise
            var images = paths.map( function ( path ) {
                return osgDB.readImageURL( path );
            } );



            var gui = new window.dat.GUI();

            var controller;

            var material1 = gui.addFolder('material1');
            controller = material1.addColor( this._config, 'materialEmission1' );
            controller.onChange( this.updateMaterial1.bind( this ) );

            controller = material1.addColor( this._config, 'materialAmbient1' );
            controller.onChange( this.updateMaterial1.bind( this ) );

            controller = material1.addColor( this._config, 'materialDiffuse1' );
            controller.onChange( this.updateMaterial1.bind( this ) );

            controller = material1.addColor( this._config, 'materialSpecular1' );
            controller.onChange( this.updateMaterial1.bind( this ) );

            controller = material1.add( this._config, 'materialShininess1', 0.01, 1.0 );
            controller.onChange( this.updateMaterial1.bind( this ) );



            var material2 = gui.addFolder('material2');
            controller = material2.addColor( this._config, 'materialEmission2' );
            controller.onChange( this.updateMaterial2.bind( this ) );

            controller = material2.addColor( this._config, 'materialAmbient2' );
            controller.onChange( this.updateMaterial2.bind( this ) );

            controller = material2.addColor( this._config, 'materialDiffuse2' );
            controller.onChange( this.updateMaterial2.bind( this ) );

            controller = material2.addColor( this._config, 'materialSpecular2' );
            controller.onChange( this.updateMaterial2.bind( this ) );

            controller = material2.add( this._config, 'materialShininess2', 0.01, 1.0 );
            controller.onChange( this.updateMaterial2.bind( this ) );


            var material3 = gui.addFolder('material3');
            controller = material3.addColor( this._config, 'materialEmission3' );
            controller.onChange( this.updateMaterial3.bind( this ) );

            controller = material3.addColor( this._config, 'materialAmbient3' );
            controller.onChange( this.updateMaterial3.bind( this ) );

            controller = material3.addColor( this._config, 'materialDiffuse3' );
            controller.onChange( this.updateMaterial3.bind( this ) );

            controller = material3.addColor( this._config, 'materialSpecular3' );
            controller.onChange( this.updateMaterial3.bind( this ) );

            controller = material3.add( this._config, 'materialShininess3', 0.01, 1.0 );
            controller.onChange( this.updateMaterial3.bind( this ) );


            var material4 = gui.addFolder('material4');
            controller = material4.addColor( this._config, 'materialEmission4' );
            controller.onChange( this.updateMaterial4.bind( this ) );

            controller = material4.addColor( this._config, 'materialAmbient4' );
            controller.onChange( this.updateMaterial4.bind( this ) );

            controller = material4.addColor( this._config, 'materialDiffuse4' );
            controller.onChange( this.updateMaterial4.bind( this ) );

            controller = material4.addColor( this._config, 'materialSpecular4' );
            controller.onChange( this.updateMaterial4.bind( this ) );

            controller = material4.add( this._config, 'materialShininess4', 0.01, 1.0 );
            controller.onChange( this.updateMaterial4.bind( this ) );

            controller = material4.add( this._config, 'materialTransparency4', 0.01, 1.0 );
            controller.onChange( this.updateMaterial4.bind( this ) );


            var material5 = gui.addFolder('material5');
            controller = material5.addColor( this._config, 'materialEmission5' );
            controller.onChange( this.updateMaterial5.bind( this ) );

            controller = material5.addColor( this._config, 'materialAmbient5' );
            controller.onChange( this.updateMaterial5.bind( this ) );

            controller = material5.addColor( this._config, 'materialDiffuse5' );
            controller.onChange( this.updateMaterial5.bind( this ) );

            controller = material5.addColor( this._config, 'materialSpecular5' );
            controller.onChange( this.updateMaterial5.bind( this ) );

            controller = material5.add( this._config, 'materialShininess5', 0.01, 1.0 );
            controller.onChange( this.updateMaterial5.bind( this ) );

            controller = material5.add( this._config, 'materialTransparency5', 0.01, 1.0 );
            controller.onChange( this.updateMaterial5.bind( this ) );


            Q.all( images ).then( function ( args ) {

                this._textures = args.map( function ( image ) {
                    var texture = new osg.Texture();
                    texture.setImage( image );
                    texture.setWrapT( 'REPEAT' );
                    texture.setWrapS( 'REPEAT' );
                    texture.setMinFilter( 'LINEAR_MIPMAP_LINEAR' );
                    return texture;
                } );

                controller = material2.add( this._config, 'texture2Unit0', this._textureNames );
                controller.onChange( this.updateMaterial2.bind( this ) );
                this.updateMaterial2();

                controller = material4.add( this._config, 'texture4Unit0', this._textureNames );
                controller.onChange( this.updateMaterial4.bind( this ) );
                this.updateMaterial4();


                controller = material3.add( this._config, 'texture3Unit0', this._textureNames );
                controller.onChange( this.updateMaterial3.bind( this ) );

                controller = material3.add( this._config, 'texture3Unit1', this._textureNames );
                controller.onChange( this.updateMaterial3.bind( this ) );
                this.updateMaterial3();

                controller = material5.add( this._config, 'texture5Unit0', this._textureNames );
                controller.onChange( this.updateMaterial5.bind( this ) );

                controller = material5.add( this._config, 'texture5Unit1', this._textureNames );
                controller.onChange( this.updateMaterial5.bind( this ) );
                this.updateMaterial5();


            }.bind( this ) );


        },

        createModelInstance: function () {

            if ( !this._model ) {

                this._model = new osg.MatrixTransform();
                osg.Matrix.makeRotate( Math.PI, 0,0,1, this._model.getMatrix());
                var request = osgDB.readNodeURL( '../media/models/material-test/file.osgjs' );

                request.then( function ( model ) {
                    this._model.addChild( model );
                    this._viewer.getManipulator().computeHomePosition();
                }.bind( this ) );

            }

            var node = new osg.MatrixTransform();
            node.addChild( this._model );
            return node;
        },

        convertColor: function ( color ) {

            var r, g, b;

            if ( color.length === 3 ) { // rgb [255, 255, 255]
                r = color[ 0 ];
                g = color[ 1 ];
                b = color[ 2 ];

            } else if ( color.length === 7 ) { // hex (24 bits style) '#ffaabb'
                var intVal = parseInt( color.slice( 1 ), 16 );
                r = ( intVal >> 16 );
                g = ( intVal >> 8 & 0xff );
                b = ( intVal & 0xff );
            }

            var result = [ 0, 0, 0, 1 ];
            result[ 0 ] = r / 255.0;
            result[ 1 ] = g / 255.0;
            result[ 2 ] = b / 255.0;
            //console.log( result );
            return result;
        },


        setStateSetTransparent: function( ss ) {
            ss.setRenderingHint('TRANSPARENT_BIN');
            ss.setAttributeAndModes( new osg.BlendFunc('ONE', 'ONE_MINUS_SRC_ALPHA' ));
        },

        updateMaterial1: function () {
            if ( !this._stateSet1 )
                return;
            var material = this._stateSet1.getAttribute( 'Material' );
            if ( !material )
                material = new osg.Material();
            this._stateSet1.setAttributeAndModes( material );
            material.setEmission( this.convertColor( this._config.materialEmission1 ) );
            material.setDiffuse( this.convertColor( this._config.materialDiffuse1 ) );
            material.setSpecular( this.convertColor( this._config.materialSpecular1 ) );
            material.setAmbient( this.convertColor( this._config.materialAmbient1 ) );

            material.setShininess( Math.exp( this._config.materialShininess1*13.0 -4.0 ) );

        },


        updateMaterial2: function () {
            if ( !this._stateSet2 )
                return;
            var material = this._stateSet2.getAttribute( 'Material' );
            if ( !material )
                material = new osg.Material();
            this._stateSet2.setAttributeAndModes( material );
            material.setEmission( this.convertColor( this._config.materialEmission2 ) );
            material.setDiffuse( this.convertColor( this._config.materialDiffuse2 ) );
            material.setSpecular( this.convertColor( this._config.materialSpecular2 ) );
            material.setAmbient( this.convertColor( this._config.materialAmbient2 ) );


            material.setShininess( Math.exp( this._config.materialShininess2*13.0 -4.0 ) );

            if ( !this._textures )
                return;

            var idx = this._textureNames.indexOf( this._config.texture2Unit0 );
            if ( idx < 0 ) idx = 1;
            var texture = this._textures[ idx ];
            this._stateSet2.setTextureAttributeAndModes( 0, texture );

        },


        updateMaterial3: function () {
            if ( !this._stateSet3 )
                return;
            var material = this._stateSet3.getAttribute( 'Material' );
            if ( !material )
                material = new osg.Material();
            this._stateSet3.setAttributeAndModes( material );
            material.setEmission( this.convertColor( this._config.materialEmission3 ) );
            material.setDiffuse( this.convertColor( this._config.materialDiffuse3 ) );
            material.setSpecular( this.convertColor( this._config.materialSpecular3 ) );
            material.setAmbient( this.convertColor( this._config.materialAmbient3 ) );

            material.setShininess( Math.exp( this._config.materialShininess3*13.0 -4.0 ) );

            var idx, texture;
            if ( !this._textures )
                return;

            idx = this._textureNames.indexOf( this._config.texture3Unit0 );
            if ( idx < 0 ) idx = 0;
            texture = this._textures[ idx ];
            this._stateSet3.setTextureAttributeAndModes( 0, texture );

            idx = this._textureNames.indexOf( this._config.texture3Unit1 );
            if ( idx < 0 ) idx = 3;
            texture = this._textures[ idx ];
            this._stateSet3.setTextureAttributeAndModes( 1, texture );


        },


        updateMaterial4: function () {
            if ( !this._stateSet4 )
                return;
            var material = this._stateSet4.getAttribute( 'Material' );
            if ( !material )
                material = new osg.Material();

            this.setStateSetTransparent( this._stateSet4 );

            this._stateSet4.setAttributeAndModes( material );

            material.setEmission( this.convertColor( this._config.materialEmission4 ) );
            material.setDiffuse( this.convertColor( this._config.materialDiffuse4 ) );
            material.setSpecular( this.convertColor( this._config.materialSpecular4 ) );
            material.setAmbient( this.convertColor( this._config.materialAmbient4 ) );

            material.setTransparency( this._config.materialTransparency4 );

            material.setShininess( Math.exp( this._config.materialShininess4*13.0 -4.0 ) );

            if ( !this._textures )
                return;

            var idx = this._textureNames.indexOf( this._config.texture4Unit0 );
            if ( idx < 0 ) idx = 1;
            var texture = this._textures[ idx ];
            this._stateSet4.setTextureAttributeAndModes( 0, texture );

        },


        updateMaterial5: function () {
            if ( !this._stateSet5 )
                return;
            var material = this._stateSet5.getAttribute( 'Material' );
            if ( !material )
                material = new osg.Material();

            this.setStateSetTransparent( this._stateSet5 );

            this._stateSet5.setAttributeAndModes( material );
            material.setEmission( this.convertColor( this._config.materialEmission5 ) );
            material.setDiffuse( this.convertColor( this._config.materialDiffuse5 ) );
            material.setSpecular( this.convertColor( this._config.materialSpecular5 ) );
            material.setAmbient( this.convertColor( this._config.materialAmbient5 ) );

            material.setTransparency( this._config.materialTransparency5 );
            material.setShininess( Math.exp( this._config.materialShininess5*15.0 -4.0 ) );

            var idx, texture;
            if ( !this._textures )
                return;

            idx = this._textureNames.indexOf( this._config.texture5Unit0 );
            if ( idx < 0 ) idx = 0;
            texture = this._textures[ idx ];
            this._stateSet5.setTextureAttributeAndModes( 0, texture );

            idx = this._textureNames.indexOf( this._config.texture5Unit1 );
            if ( idx < 0 ) idx = 5;
            texture = this._textures[ idx ];
            this._stateSet5.setTextureAttributeAndModes( 1, texture );


        },

        createScene: function () {
            var group = new osg.Node();

            var model1 = this.createModelInstance();
            this._stateSet1 = model1.getOrCreateStateSet();
            this.updateMaterial1();


            var model2 = this.createModelInstance();
            this._stateSet2 = model2.getOrCreateStateSet();
            osg.Matrix.makeTranslate( 30, 0, 0, model2.getMatrix() );
            this.updateMaterial2();


            var model3 = this.createModelInstance();
            this._stateSet3 = model3.getOrCreateStateSet();
            osg.Matrix.makeTranslate( 60, 0, 0, model3.getMatrix() );
            this.updateMaterial3();


            var model4 = this.createModelInstance();
            this._stateSet4 = model4.getOrCreateStateSet();
            osg.Matrix.makeTranslate( 90, 0, 0, model4.getMatrix() );
            this.updateMaterial4();

            var model5 = this.createModelInstance();
            this._stateSet5 = model5.getOrCreateStateSet();
            osg.Matrix.makeTranslate( 120, 0, 0, model5.getMatrix() );
            this.updateMaterial5();



            group.addChild( model1 );
            group.addChild( model2 );
            group.addChild( model3 );
            group.addChild( model4 );
            group.addChild( model5 );

            return group;
        },

        run: function ( canvas ) {

            var viewer;
            viewer = new osgViewer.Viewer( canvas, this._osgOptions );
            this._viewer = viewer;
            viewer.init();

            var scene = this.createScene();

            viewer.setSceneData( scene );
            viewer.setupManipulator();
            viewer.getManipulator().computeHomePosition();

            viewer.run();

            this.initDatGUI();
        }
    };

    window.addEventListener( 'load', function () {
        var example = new Example();
        var canvas = $( '#View' )[ 0 ];
        example.run( canvas );
    }, true );

} )();