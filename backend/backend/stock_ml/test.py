import numpy as np
import matplotlib.pyplot as plt

def main():
    # Generate data
    x = np.linspace(0, 10, 100)
    y = np.sin(x)

    # Plotting
    plt.plot(x, y)
    plt.title('Sine Wave')
    plt.xlabel('X-axis')
    plt.ylabel('Y-axis')
    plt.grid(True)
    plt.show()

if __name__ == "__main__":
    main()
