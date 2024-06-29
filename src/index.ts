const parent = wl_get_object_self_parent();
const cameraPath = wl_get_object_below("CameraPath", parent);
let cameraGUIDs = wl_get_object_string_option(cameraPath, "waypointGUIDs");
cameraGUIDs = cameraGUIDs.startsWith(",") ? cameraGUIDs.substring(1) : cameraGUIDs;
    if (cameraGUIDs.length !== 0) {
    const step = 1 / (cameraGUIDs.split(",").length - 1);
    const progress = wl_get_object_float_option(cameraPath, "Progress");
    const forwards = wl_get_call_argument_as_bool();
    const desiredProgress = forwards ? Math.min(1, progress + step) : Math.max(0, progress - step);
    if (progress !== desiredProgress) {
        wl_execute_object_event_receiver(wl_get_object_below("ProgressVariable", parent), "ChangeValue", `${desiredProgress}`);
    }
    
}