import * as application from 'application';
import * as frame from 'ui/frame';

import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./modules/app.module";
import { registerElement } from "nativescript-angular/element-registry";
registerElement("DropDown", () => require("nativescript-drop-down/drop-down").DropDown);
/*application.on(application.launchEvent, function (args: application.ApplicationEventData) {
    if (args.android) {
        // For Android applications, args.android is an android.content.Intent class.
       alert("Launched Android application with the following intent: " + args.android + ".");
    } else if (args.ios !== undefined) {
        // For iOS applications, args.ios is NSDictionary (launchOptions).
        alert("Launched iOS application with options: " + args.ios);
    }
});

application.on(application.suspendEvent, function (args: application.ApplicationEventData) {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        alert("Activity:suspendEvent " + args.android);
    } else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        alert("UIApplication: " + args.ios);
    }
});

application.on(application.resumeEvent, function (args: application.ApplicationEventData) {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        alert("Activity:resumeEvent " + args.android);
    } else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        alert("UIApplication: " + args.ios);
    }
});

application.on(application.exitEvent, function (args: application.ApplicationEventData) {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        alert("Activity: exitEvent" + args.android);
    } else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        alert("UIApplication: " + args.ios);
    }
});

application.on(application.lowMemoryEvent, function (args: application.ApplicationEventData) {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        alert("Activity: lowMemoryEvent" + args.android);
    } else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        alert("UIApplication: " + args.ios);
    }
});

application.on(application.uncaughtErrorEvent, function (args: application.ApplicationEventData) {
    if (args.android) {
        // For Android applications, args.android is an NativeScriptError.
        alert("NativeScriptError: uncaughtErrorEvent" + args.android);
    } else if (args.ios) {
        // For iOS applications, args.ios is NativeScriptError.
        alert("NativeScriptError: " + args.ios);
    }
});*/
if (application.android) {
    /*application.android.on(application.AndroidApplication.activityCreatedEvent, function (args: application.AndroidActivityBundleEventData) {
        alert("Event: " + args.eventName + ", Activity: " + args.activity + ", Bundle: " + args.bundle);
    });

    application.android.on(application.AndroidApplication.activityDestroyedEvent, function (args: application.AndroidActivityEventData) {
        alert("Event: " + args.eventName + ", Activity: " + args.activity);
    });

    application.android.on(application.AndroidApplication.activityStartedEvent, function (args: application.AndroidActivityEventData) {
        alert("Event: " + args.eventName + ", Activity: " + args.activity);
    });

    application.android.on(application.AndroidApplication.activityPausedEvent, function (args: application.AndroidActivityEventData) {
        alert("Event: " + args.eventName + ", Activity: " + args.activity);
    });

    application.android.on(application.AndroidApplication.activityResumedEvent, function (args: application.AndroidActivityEventData) {
        alert("Event: " + args.eventName + ", Activity: " + args.activity);
    });

    application.android.on(application.AndroidApplication.activityStoppedEvent, function (args: application.AndroidActivityEventData) {
        alert("Event: " + args.eventName + ", Activity: " + args.activity);
    });

    application.android.on(application.AndroidApplication.saveActivityStateEvent, function (args: application.AndroidActivityBundleEventData) {
        alert("Event: " + args.eventName + ", Activity: " + args.activity + ", Bundle: " + args.bundle);
    });

    application.android.on(application.AndroidApplication.activityResultEvent, function (args: application.AndroidActivityResultEventData) {
        alert("Event: " + args.eventName + ", Activity: " + args.activity +
            ", requestCode: " + args.requestCode + ", resultCode: " + args.resultCode + ", Intent: " + args.intent);
    });*/

    application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args: application.AndroidActivityBackPressedEventData) {
        alert("Event: " + args.eventName + ", Activity: " + args.activity);
        var currentPage = frame.topmost().currentPage;
        //alert("Result :" + JSON.stringify(frame.topmost().currentPage));
        alert(currentPage);
        args.cancel = true;
    });
}



platformNativeScriptDynamic().bootstrapModule(AppModule);