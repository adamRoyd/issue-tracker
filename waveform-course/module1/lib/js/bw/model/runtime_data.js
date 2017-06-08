/**
* Runtime Custom Data v0.1
* @author James Whitwell
*/
function RuntimeCustomData()
{
	var self = this;
	
	if ( devmode ) console.log( 'Log RuntimeCustomData' )
	
	self.data = {};
	
	self.createDataset = function(datasetId)
	{
		self.data[datasetId] = {};
		return self.data[datasetId];
	}
	
	self.getDataset = function(datasetId)
	{
		return self.data[datasetId];
	}
	
	self.setDataset = function(datasetId, dataset)
	{
		self.data[datasetId] = dataset;
	}
	
	self.setData = function(datasetId, dataId, data, saveToLMS)
	{
		if ( devmode ) console.log( 'Log SET DATA %s %s %s %s' , datasetId ,dataId, data, saveToLMS)
		var dataset = self.data[datasetId];
		if (!dataset)
		{
			dataset = self.createDataset(datasetId);
		}
				
		self.data[datasetId][dataId] = data;
		
		if (saveToLMS) self.updateLMS(datasetId);
	}
	
	self.getData = function(datasetId, dataId)
	{
		if ( devmode ) console.log( 'Log GET DATA 1 %s %s %s' , datasetId ,dataId)
		
		var dataset = self.data[datasetId];
		if (!dataset) return null;
		
		if ( devmode ) console.log( 'Log GET DATA 2 %s %s %s' , datasetId ,dataId,dataset[dataId])
		
		return dataset[dataId];
	}
	
	self.updateLMS = function(datasetId)
	{
		if ( devmode ) console.log("runtimeData.updateLMS() datasetId: " + datasetId + ' %o ', self.data);
		
		var dataset = self.data[datasetId];
		if (dataset)
		{
			var json = JSON.stringify(dataset);
			trackingObj.setCustomData(datasetId + '_ds', json);
		}
	}
	
}