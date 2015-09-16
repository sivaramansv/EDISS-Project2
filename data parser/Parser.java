import java.io.*;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Queue;
import java.util.Set;
import java.util.StringTokenizer;

public class Parser {

	public static void main(String[] args) throws IOException
	{
		List<String> productList=new ArrayList<String>();
		List<String> categoryList=new ArrayList<String>();
	
		
		String fileName="/home/sivaraman/Desktop/Project2Data.txt";
		String productFileName="/home/sivaraman/Desktop/product1.txt";
		String categoryFileName="/home/sivaraman/Desktop/category.txt";
		
		File file=new File(fileName);
		File productFile=new File(productFileName);
		File categoryFile=new File(categoryFileName);
		if(!productFile.exists())
		{
			try {
				productFile.createNewFile();
				categoryFile.createNewFile();
				
			} catch (IOException e) {
				
				System.out.println("File could not be created");
			}
		}
		
		FileReader fReader=new FileReader(fileName);
		BufferedReader bufferedReader=new BufferedReader(fReader);
		FileWriter pfWriter=new FileWriter(productFile);
		BufferedWriter bufferedWriter=new BufferedWriter(pfWriter);
		FileWriter catWriter=new FileWriter(categoryFileName);
		BufferedWriter bCatWriter=new BufferedWriter(catWriter);
		
		String line="";
		try {
			while((line=bufferedReader.readLine())!=null)
			{
				if(line.contains("Id:"))
				{
					String id=line.substring(line.indexOf(" "));
					productList.add(id);
				}
				if(line.contains("ASIN:"))
				{
					String asin=line.substring(line.indexOf(" "));
					productList.add(asin);
				}
				if(line.contains("title:"))
				{
					productList.add(line.substring(9));
				}
				if(line.contains("group:"))
				{
					productList.add(line.substring(9));
				}
				if(line.contains("categories:"))
				{
					System.out.println(line.substring(13));
				}
				if(line.contains("|"))
				{
					StringTokenizer tokenizer=new StringTokenizer(line,"|");
					
					while(tokenizer.hasMoreElements())
					{
						String category=(String) tokenizer.nextElement();
						StringTokenizer categorySplitter=new StringTokenizer(category,"[");
						while(categorySplitter.hasMoreElements())
						{			
							String element=(String)categorySplitter.nextToken();
							boolean isBlankLine=element.trim().isEmpty();
						    if(!isBlankLine)
						    {
						    	if(element.contains("]"))
						    	{
						    		element=element.substring(0,element.length()-1);
						    	}
						    	categoryList.add(element);
						    }
			
						}
					}
				}
				
			}
			bufferedReader.close();
			for(int i=0;i<productList.size();i+=4)
			{
				bufferedWriter.write((productList.get(i)+"\t"+productList.get(i+1)+"\t"+productList.get(i+2)+"\t"+productList.get(i+3)+"\n"));	
			}
			HashMap<String,String> hMap=new HashMap<String,String>();
			
			for(int i=0;i<categoryList.size()-1;i+=2)
			{
				if(!hMap.containsKey(categoryList.get(i)))
				{
					hMap.put(categoryList.get(i),categoryList.get(i+1));
				}
			}
			Iterator it=hMap.entrySet().iterator();
			while(it.hasNext())
			{
				Map.Entry pair=(Map.Entry)it.next();
				bCatWriter.write(pair.getKey()+"\t"+pair.getValue()+"\n");
				it.remove();
			}
			
			bufferedWriter.close();
			bCatWriter.close();
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}