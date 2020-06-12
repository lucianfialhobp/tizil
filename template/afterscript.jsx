var myApp = (function() {
    // Private
    var videoFolder = new Folder("C:\\Code\\jarvis\\temp");
          
    
    var importVideoFiles = function(videoFolder){
        var importOptions = new ImportOptions(),
              importLayers = [],
              videosFiles = videoFolder.getFiles ("*.mp4");

        for(var i = 0; i < videosFiles.length; i++){
            app.project.importFile(new ImportOptions(videosFiles[i]))
        }
   
    }
    
    var getCompositDurationAndVisualArray = function(){
            var duration = 0,
                   visualArray = [];
            
            for(var i = 1; i <= app.project.numItems; i++){
                visualArray.push(app.project.item(i));
                duration += app.project.item(i).duration;
            }
        
            return {
                duration:  duration,
                visualArray: visualArray
            }
    }
    
   var insertVideosToComposition = function(){
        var obj = getCompositDurationAndVisualArray(),
               composition = app.project.items.addComp("Main", 1920, 1080, 1, obj.duration, 30),
               startTime = 0;
               
        composition.openInViewer();
 
        for(var i = 0; i < obj.visualArray.length; i++){
            var thisLayer = composition.layers.add(obj.visualArray[i]);
                    thisLayer.startTime = startTime;
                    startTime = thisLayer.outPoint;
        }
    
        return composition
   }

    var render = function(composition){
        var video = new File("C:\\Code\\jarvis\\temp\\output.mov"),
               theRender = app.project.renderQueue.items.add(composition);
           
           //theRender.outputModules[1].applyTemplate("MOV");
            theRender.outputModules[1].file = video;
            app.endUndoGroup();
            app.project.renderQueue.render();

            app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
    }

    var init = function(){
            importVideoFiles(videoFolder);
            var composition = insertVideosToComposition();
            render(composition);
        }
    
    // Public
    return {
        init: init()
    };  
})();   
