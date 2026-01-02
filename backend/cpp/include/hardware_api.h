#ifndef HARDWARE_API_H
#define HARDWARE_API_H

#include <string>
#include <vector>
#include <cstdint>

namespace Aiva {

    /**
     * Represents a connection status to an external hardware device.
     */
    enum class DeviceStatus {
        DISCONNECTED,
        CONNECTED,
        ERROR,
        BUSY
    };

    /**
     * Structure holding raw data from an IoT sensor (e.g., temperature, RFID UID).
     */
    struct SensorData {
        std::string deviceId;
        std::string sensorType; // "RFID", "BIOMETRIC", "TEMP"
        double value;
        std::string rawPayload; // Hex or JSON string
        long timestamp;
    };

    class HardwareInterface {
    public:
        /**
         * Initializes the serial or network connection to the hardware controller.
         * @param port The COM port or IP address (e.g., "COM3" or "192.168.1.50")
         * @return bool True if connection is successful
         */
        static bool connect(const std::string& port);

        /**
         * Closes the connection to the hardware.
         */
        static void disconnect();

        /**
         * Reads the latest available data packet from the device.
         * @return SensorData The parsed sensor reading
         */
        static SensorData readSensor();

        /**
         * Sends a control signal to the hardware (e.g., to unlock a door or turn on a servo).
         * @param command The command string (e.g., "OPEN_GATE")
         * @return bool True if the command was acknowledged
         */
        static bool sendCommand(const std::string& command);

        /**
         * Checks the current health/status of the connected hardware.
         */
        static DeviceStatus getStatus();
    };

}

#endif // HARDWARE_API_H