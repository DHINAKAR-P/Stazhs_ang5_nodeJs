package com.stahls.selenium;

import org.apache.log4j.Logger;
import org.junit.After;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.safari.SafariDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.util.concurrent.TimeUnit;

import org.apache.log4j.BasicConfigurator;

@SpringBootApplication
public class StahlsApplication {
	static WebDriver driver = null;
	
	
	static String DRIVER = "geckodriver_firefox";
	static String WEB_DRIVER = "webdriver_firefox";
	static String HOST_LOCATION = "host-location";
	static String DRIVER_FLAVOR = "driver_flavor";
	final static Logger logger = Logger.getLogger(StahlsApplication.class);
	

	
	@Test
	public static void main(String[] args) throws Exception {
		
		
		BasicConfigurator.configure();
		ConfigurableApplicationContext applicationValues = SpringApplication.run(StahlsApplication.class, args);
		
		String Driver = applicationValues.getEnvironment().getProperty(DRIVER);
		logger.info("geckDriver -- value -- > " + Driver);
		
		String webDriver = applicationValues.getEnvironment().getProperty(WEB_DRIVER);
		logger.info("webDriver -- value -- > " + webDriver);
		
		String hostLocation = applicationValues.getEnvironment().getProperty(HOST_LOCATION);
		logger.info("hostLocation -- value -- > " + hostLocation);	
		System.setProperty(webDriver, Driver);
		
		String driver_flavor = applicationValues.getEnvironment().getProperty(DRIVER_FLAVOR);
		
		logger.info("driver_flavor --  -- > " + driver_flavor);
		logger.info("---------------------"+System.getProperty(webDriver));
		
		
		switch (driver_flavor) {
		case "Firefox":
			driver = new FirefoxDriver();
			break;
		case "Chrome":
			System.out.println("in am  an chrome browser");
	        driver = new ChromeDriver();	
			driver.manage().window().maximize();						
			break;
		case "Edge":
			driver = new EdgeDriver();
			break;
		case "Safari":
			driver = new SafariDriver();
			break;
		case "headlessChrome":
		     ChromeOptions chromeOptions = new ChromeOptions();
		     chromeOptions.setBinary("/usr/bin/google-chrome");
		     chromeOptions.addArguments("--headless");
		     driver = new ChromeDriver(chromeOptions);  
			break; 			
		case "headlessFirefox":
			 FirefoxOptions firefoxOptions = new FirefoxOptions(); 
			 firefoxOptions.setBinary("/usr/bin/firefox");
			 firefoxOptions.addArguments("--headless");
			 																																																																					
		     driver = new FirefoxDriver(firefoxOptions);
			break; 			
																																																																																																								
		default:
			logger.info("default case called, DO Nothing...!!!");
		}
																																																																																																																						
			
		driver.navigate().to(hostLocation);
		doLogin(driver);
		ticketDashboard(driver);																													
		onticketDashboard(driver);
		gotoUserManagement(driver);
		//addNewOrg(driver);
		//addNewGroup(driver);
		addNewUser(driver);
		gotoAssignReport(driver);
		//onAssignReport(driver);
		
		//signout(driver);
		

		//Thread.sleep(8000);
		driver.quit();
		System.exit(0);
	}

	public static String doLogin(WebDriver driver) throws Exception {
		logger.info("~~~~~~~~~~~~~~~~~~~~Testing Started~~~~~~~~~~~~~~~~~~>" );
		String appTitle = driver.getTitle();
		logger.info("Application title is :: " + appTitle);
		WebElement login = driver.findElement(By.id("login"));
		login.click();
		System.out.println(driver.getPageSource());
		WebDriverWait wait = new WebDriverWait(driver, 10);
		
		WebElement inputEmail = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("inputEmail"))); 
				//driver.findElement(By.id("inputEmail"));
		System.out.println("~~~~~~~~~~~~~~~~~~~~~"+inputEmail.getText());
		inputEmail.sendKeys("admin");
		WebElement inputPassword = driver.findElement(By.id("inputPassword"));
		inputPassword.sendKeys("admin");
		WebElement inputSignin = driver.findElement(By.xpath("//button[@class ='btn btn-lg btn-primary btn-block']"));
		inputSignin.click();
		logger.info("~~~~~~~~~~~~~~~~~~~~login sucess~~~~~~~~~~~~~~~~~~~~~>" );
		return "succeed";
	}
	

	
	public static String ticketDashboard(WebDriver driver) throws Exception {
		
		WebDriverWait wait = new WebDriverWait(driver, 10);
		WebElement ticketDrope = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("ticketDrope")));
		ticketDrope.click();
		WebElement ticketSelect = driver.findElement(By.xpath("//li[@class ='ticketSelect']"));
    	ticketSelect.click();
    	logger.info("~~~~~~~~~~~~~~~~~~ticket dashboard Sucess~~~~~~~~~~~~~~>");	
		return "succeed";
	}
	
	
public static String onticketDashboard(WebDriver driver) throws Exception { 
		
  	 
    	WebElement statusDrop = driver.findElement(By.xpath("/html/body/app-root/div/app-ticketdashboard/section/div/div[1]/div[3]/mat-form-field")); 	
    	statusDrop.click();   	
    	WebElement statusSelect = driver.findElement(By.xpath("//*[@id=\"mat-option-1\"]/span")); 
    	statusSelect.click();     			
    	WebElement filterStatus = driver.findElement(By.xpath("/html/body/app-root/div/app-ticketdashboard/section/div/div[1]/div[4]/button[2]"));
    	filterStatus.click();
    	
    	WebDriverWait wait = new WebDriverWait(driver, 10);
		WebElement editStatus = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/app-root/div/app-ticketdashboard/section/div/div[3]/mat-table/mat-row/mat-cell[2]/i")));
    	editStatus.click(); 
    	
    	WebElement userTab = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"mat-tab-label-0-1\"]"))); 
    	userTab.click();
    	//WebElement cancelDetails = driver.findElement(By.xpath("/html/body/app-root/div/app-ticketdetails/section/div/div/button[5]")); 
    	//cancelDetails.click();
    	
    	logger.info("~~~~~~~~~~~ticket dashboard operations Success~~~~~~~~~~~>" );	
    	
    	return "succeed";
	}

 
public static String gotoUserManagement(WebDriver driver) throws Exception { 
	
	Thread.sleep(6000); 
	WebDriverWait wait = new WebDriverWait(driver, 10);
	//WebElement gohome = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("goHome")));
	//gohome.click();
	
	WebElement adminDrop = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"myNavbar\"]/ul/li[3]")));
	adminDrop.click();
	WebElement userManageSelect = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"myNavbar\"]/ul/li[3]/ul/li[2]")));
	userManageSelect.click();
	   logger.info("~~~~~~~~~~~~~~~~gotoUserManagement success~~~~~~~~~~~~~~~~>");
	return "succeed";

}

public static String addNewOrg(WebDriver driver) throws Exception { 
	
	//Thread.sleep(6000); 
	WebDriverWait wait = new WebDriverWait(driver, 10);
	
	WebElement createOrgButton = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/app-root/div/app-organization/section/div/div/div[2]/div/div/button")));
	createOrgButton.click(); 
	
	WebElement clickInput = driver.findElement(By.xpath("/html/body/app-root/div/app-organization/section/div/div/div[2]/div/div/div/mat-form-field/div/div[1]"));
	clickInput.click();
	
	WebElement inputOrg = driver.findElement(By.xpath("//*[@id=\"inputOrg\"]"));
	inputOrg.sendKeys("MyOrganisation");
	
//	WebElement inputOrg = driver.findElement(By.id("inputOrg"));
//	inputOrg.sendKeys("MyOrg");
	
	WebElement addButton = driver.findElement(By.xpath("/html/body/app-root/div/app-organization/section/div/div/div[2]/div/div/div/div/button[1]"));
	addButton.click();	
	
	logger.info("~~~~~~~~~~~~create organization Success~~~~~~~~~~~~~~~~~~~~~~~~>");
	return "succeed";

}

public static String addNewGroup(WebDriver driver) throws Exception { 
	
	//Thread.sleep(6000); 
	WebDriverWait wait = new WebDriverWait(driver, 10);
	
	WebElement gotoGroup = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/app-root/div/app-organization/section/div/div/div[1]/ul/li[2]")));
	gotoGroup.click(); 
	
	WebElement createGroupBtn = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/app-root/div/app-organization/section/div/div/div[2]/div/div/button")));
	createGroupBtn.click(); // 
	
	WebElement dropOrg = driver.findElement(By.xpath("//*[@id=\"mat-select-2\"]/div/div[1]"));
	dropOrg.click(); 
	
	
	
	//WebElement selectOrg = driver.findElement(By.xpath("//*[@id=\"mat-option-10\"]"));
	//selectOrg.click();
	
	//WebElement inputGrp = driver.findElement(By.xpath("//*[@id=\"mat-input-1\"]"));
	//inputGrp.sendKeys("MyGroup");
	
	
	//WebElement addButton = driver.findElement(By.xpath("/html/body/app-root/div/app-organization/section/div/div/div[2]/div/div/div/div/button[1]"));
	//addButton.click();		
	logger.info("~~~~~~~~~~~~~~~~~~create group Success~~~~~~~~~~~~~~~~~~~~~~~~~>");
	return "succeed";

}



public static String addNewUser(WebDriver driver) throws Exception { 
	
	Thread.sleep(6000); 
	WebDriverWait wait = new WebDriverWait(driver, 10);
	
	WebElement gotoUser = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/app-root/div/app-organization/section/div/div/div[1]/ul/li[3]")));
	gotoUser.click(); 
	
	WebElement createUserBtn = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/app-root/div/app-organization/section/div/div/div[2]/div/div/button")));
	createUserBtn.click(); //*[@id="mat-select-1"]
	
	
	WebElement inputUserName = driver.findElement(By.xpath("//*[@id=\"mat-input-1\"]"));
	inputUserName.sendKeys("MyUser");
	
	WebElement inputPassword = driver.findElement(By.xpath("//*[@id=\"mat-input-2\"]"));
	inputPassword.sendKeys("12345");
	
	WebElement inputFirstName = driver.findElement(By.xpath("//*[@id=\"mat-input-3\"]"));
	inputFirstName.sendKeys("myfirst");
	
	WebElement inputLastName = driver.findElement(By.xpath("//*[@id=\"mat-input-4\"]"));
	inputLastName.sendKeys("mylast");
	
	WebElement inputEmail = driver.findElement(By.xpath("//*[@id=\"mat-input-5\"]"));
	inputEmail.sendKeys("test@gmail.com"); 
	
	WebElement droporg = driver.findElement(By.xpath("//*[@id=\"mat-select-4\"]/div/div[1]"));
	droporg.click();
	
	WebElement orgSelect = driver.findElement(By.xpath("//*[@id=\"mat-option-15\"]"));
	orgSelect.click();
	
	//WebElement dropRole = driver.findElement(By.xpath("//*[@id=\"mat-select-0\"]/div/div[1]"));
	//dropRole.click();
	
	//WebElement RoleSelect = driver.findElement(By.xpath("//*[@id=\"mat-option-9\"]/mat-pseudo-checkbox")); 
	//RoleSelect.click();
	
	//WebElement clickexit = driver.findElement(By.xpath("/html/body/div/div[2]")); 
	//clickexit.click(); 
	
	WebElement addUserBtn = driver.findElement(By.xpath("/html/body/app-root/div/app-organization/section/div/div/div[2]/div/div/div/div[2]/button[1]")); 
	addUserBtn.click();
	
	
		
	logger.info("~~~~~~~~~~~~~~~~~~~~create User Success~~~~~~~~~~~~~~~~~~~~~~~>");
	return "succeed";

}

public static String gotoAssignReport(WebDriver driver) throws Exception { 
	
	Thread.sleep(8000); 
	WebDriverWait wait = new WebDriverWait(driver, 10);
	//WebElement gohome = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("goHome")));
	//gohome.click();
	
	WebElement adminDrop = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"myNavbar\"]/ul/li[3]")));
	adminDrop.click();
	WebElement assignReportSelect = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"adminDrop\"]/ul/li[1]")));
	assignReportSelect.click();
	
	logger.info("~~~~~~~~~~~assignReportSelect Success~~~~~~~~~~~~~~~~~~~~~~~~~~>");
	return "succeed";

}


public static String onAssignReport(WebDriver driver) throws Exception { 
	
	//Thread.sleep(6000); 
	WebDriverWait wait = new WebDriverWait(driver, 10);
	//WebElement gohome = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("goHome")));
	//gohome.click();
	
     WebElement assignDrop = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("assignBy")));
	 assignDrop.click();
	 
	 WebElement SelectUser = wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("user")));
	 SelectUser.click();
	 
	 WebElement orgDrope = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("orgDrope")));
	 orgDrope.click(); 
	 
	 //WebElement orgSelect = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"mat-option-19\"]")));
	 //orgSelect.click();
	 
	 WebElement reportsDrope = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("reportsDrope")));
	 reportsDrope.click();
	
	
	//	WebElement assignDrop = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"mat-select-0\"]")));
	//	assignDrop.click();
	//	WebElement assignSelect = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"mat-option-1\"]")));
	//	assignSelect.click();
	//	
	//	WebElement orgDrop = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"mat-select-1\"]")));
	//	orgDrop.click();
	 
	//	WebElement orgSelect = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"mat-option-9\"]")));
	//	orgSelect.click();
			
	//WebElement reportsDrop = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"mat-select-2\"]")));
	//reportsDrop.click();
	//WebElement reportsSelect = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"mat-option-12\"]")));
	//reportsSelect.click();
	
	logger.info("~~~~~~~~~~~OnAssignReportSelect Success~~~~~~~~~~~~~~~~~~~~~~~~~>");
	return "succeed";

}


public static String signout(WebDriver driver) throws Exception {
	
	    Thread.sleep(6000); 
		WebDriverWait wait = new WebDriverWait(driver, 10);
		WebElement signOut = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signout")));
		signOut.click();
			
		logger.info("~~~~~~~~~~~Signout Success~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>");
		return "succeed";
	}


 @After
  public void teardown() {
    driver.quit();
  }   
	
}
