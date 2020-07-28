// nPrentko

// Call function to plot the data for the bar plot,etc...
function bPlot(id) {
    // Retrieve the data for visuals from samples.json file
    d3.json("samples.json").then((Data)=> {
        
   
        // Use filter function to filter the data by id(s) 
        let samples = Data.samples.filter(s => s.id.toString() === id)[0];
        
  
        // Use the slice() method to extract a section of the string and return it as a new string,
        // without modifying the original string. Isolate top ten in new string. 
        let samplevalues = samples.sample_values.slice(0, 10).reverse();
  
        // Use the slice() method to extract a section of the string and return it as a new string,
        // without modifying the original string. Isolate top ten OTU in new string.  
        let topOTU = (samples.otu_ids.slice(0, 10)).reverse();
        
        // Use .map() to create an array from calling a specific function on each item in the parent array, in this case OTU_top
        let OTU_id = topOTU.map(d => "OTU " + d)
    
        // Use the slice() method to extract a section of the string and return it as a new string,
        // without modifying the original string. Isolate top ten labels in new string.
        let labels = samples.otu_labels.slice(0, 10);
  
        // Declare and assign variable for the bar plots specs
        let trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'rgb(235,0,0)'},
            type:"bar",
            orientation: "h",
        };
  
        // Assign and declare a new variable the value of the trace variable
        var Data = [trace];
  
        // Create layout variable to set the title, yaxis, tickmode and all four margins.
        let layout = {
            title: "The Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 75,
                r: 75,
                t: 75,
                b: 0
            }
        };
  
        // Use plotly to create the bar plot. Apply the data and the specs. via respective variables
        Plotly.newPlot("bar", Data, layout);
  
      
        // Declare and assign a variable for the bubble chart's specs.
        let trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };
  
        // Create a variable to set the title, xaxis' title, height and width of the bubble plot.
        let bubbleLayout = {
            title: "OTU Bubble Plot",
            xaxis:{title: "OTU ID"},
            height: 625,
            width: 1250
        };
  
        // Declare a variable called bubbleData and assign it the value of the variable, trace1
        let bubbleData = [trace1];
  
        // Use plotly to create a bubble plot and call the data, as well as the layout
        Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
  
      });
  }  
// Create a function to call for the data
function callData(id) {
    // Use d3 to read data
    d3.json("samples.json").then((data)=> {
        
        // Declare and assign a variable to hold metadata
        let metadata = data.metadata;


        // Use filter function to filter the metadata
        let fMeta = metadata.filter(meta => meta.id.toString() === id)[0];

        // Create variable to hold data relative to selction
        let demo = d3.select("#sample-metadata");
        
        // Clear demo prior to inserting new relatiive info.
        demo.html("");

        // Call relative data
        Object.entries(fMeta).forEach((key) => {   
                demo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// Create the function for the change event
function optionChanged(id) {
    bPlot(id);
    callData(id);
}

// Create the function to call initial data
function init() {
    // Create dropdown
    let dropdown = d3.select("#selDataset");

    // Call data 
    d3.json("samples.json").then((Data)=> {

        // Apply ID data to dropdown
        Data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // Call the functions 
        bPlot(Data.names[0]);
        callData(Data.names[0]);
    });
}

init();