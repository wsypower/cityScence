import { Path, Gradient, append } from "spritejs";
class Outline {
  constructor(Group) {
    this.out = null;
    this.outLine = null;
    this.Group = Group;
  }
  init({ Group }) {
    this.Group = Group;
    this.outLine = new Path();
    this.out = new Path();
    this.outLine.attr({
      d:
        "M425.650,51.201 L418.504,35.142 C418.504,35.142 388.656,32.026 377.411,32.671 C366.166,33.316 341.678,27.730 341.678,27.730 L318.452,4.259 L305.945,1.789 C305.945,1.789 292.948,5.899 286.292,4.259 C279.636,2.619 272.016,6.118 268.426,6.730 C264.835,7.342 262.023,6.664 264.852,12.906 C267.681,19.148 266.893,25.664 268.426,36.377 C269.958,47.090 266.262,53.168 261.279,53.671 C256.296,54.174 259.527,55.071 255.919,57.377 C252.311,59.684 244.507,58.875 246.986,64.789 C249.465,70.703 244.507,73.852 246.986,78.377 C249.465,82.903 234.549,82.444 230.906,82.083 C227.263,81.723 215.483,80.520 214.826,87.025 C214.169,93.529 192.493,85.833 205.893,98.142 C219.293,110.452 214.563,94.360 223.759,105.554 C232.955,116.748 235.119,116.246 230.906,121.613 C226.694,126.981 218.329,119.656 214.826,129.025 C211.323,138.394 204.106,135.201 204.106,135.201 C204.106,135.201 205.814,142.963 182.667,138.907 C159.519,134.852 159.458,140.667 154.080,135.201 C148.703,129.735 133.560,131.157 138.001,138.907 C142.441,146.658 152.977,152.365 145.147,156.202 C137.317,160.039 132.737,164.477 141.574,168.555 C150.411,172.632 137.607,179.563 145.147,183.378 C152.688,187.194 157.846,196.114 148.720,196.967 C139.594,197.819 125.214,204.007 127.281,210.555 C129.348,217.103 129.137,232.736 120.134,232.791 C111.131,232.845 117.060,239.973 105.841,238.967 C94.622,237.961 85.724,241.700 86.188,245.144 C86.652,248.587 84.209,252.807 75.468,255.026 C66.727,257.245 55.815,262.438 55.815,262.438 L23.655,277.262 C23.655,277.262 12.874,284.488 21.869,288.379 C30.863,292.271 15.598,299.530 7.576,298.262 C-0.447,296.994 -0.088,305.127 4.002,308.144 C8.092,311.161 -2.776,315.272 5.789,320.497 C14.354,325.723 3.135,328.346 14.722,330.380 C26.309,332.413 14.013,336.370 21.869,336.556 C29.725,336.742 36.162,337.792 36.162,337.792 C36.162,337.792 31.590,345.903 46.882,346.439 C62.173,346.974 52.872,356.441 55.815,358.792 C58.758,361.142 71.895,372.380 71.895,372.380 C71.895,372.380 80.224,380.885 75.468,385.968 C70.712,391.052 72.884,408.368 82.615,411.910 C92.345,415.452 79.619,422.164 87.975,425.498 C96.330,428.832 78.323,435.566 86.188,439.087 C82.667,446.148 87.808,450.499 96.908,447.734 C106.007,444.968 112.988,437.851 112.988,437.851 L125.494,444.028 L141.574,434.145 L146.934,437.851 L157.654,450.204 L157.654,461.322 L148.720,469.969 C148.720,469.969 133.368,473.916 148.720,481.087 C164.073,488.258 163.977,497.375 166.587,497.146 C169.197,496.916 176.466,509.488 179.093,509.499 C181.721,509.510 177.307,520.617 177.307,520.617 L180.880,526.793 L193.387,536.676 L186.240,547.793 C186.240,547.793 189.997,557.610 196.960,555.205 C203.923,552.800 211.253,550.264 211.253,550.264 L232.693,552.734 L250.559,560.146 L259.492,558.911 L270.212,549.029 L280.932,544.087 C280.932,544.087 285.040,550.045 293.439,545.323 C301.838,540.600 291.048,529.690 297.012,524.323 C302.976,518.955 314.878,519.381 314.878,519.381 C314.878,519.381 327.219,534.150 332.745,539.146 C338.271,544.142 339.611,562.814 350.611,565.088 C361.611,567.361 366.709,576.063 373.838,572.499 C380.967,568.936 386.344,565.088 386.344,565.088 L386.344,560.146 L407.784,562.617 C407.784,562.617 422.357,558.288 423.864,553.970 C425.370,549.652 437.912,546.941 445.303,550.264 C452.695,553.587 461.278,547.771 464.956,555.205 C468.635,562.639 463.047,569.132 472.103,578.676 C465.788,589.007 482.622,595.544 481.036,583.617 C487.421,579.561 495.329,582.382 495.329,582.382 L498.903,567.558 C498.903,567.558 498.649,549.018 507.836,551.499 C517.023,553.981 519.107,558.747 520.343,550.264 C521.577,541.781 516.769,539.146 516.769,539.146 C516.769,539.146 520.596,532.992 511.409,530.499 C502.222,528.007 493.368,519.305 506.049,518.146 C518.731,516.987 518.950,515.391 518.556,509.499 C518.162,503.607 514.142,496.763 522.129,494.675 C530.116,492.587 541.782,481.087 541.782,481.087 L550.715,476.146 C550.715,476.146 546.266,472.822 550.715,468.734 C555.164,464.645 536.422,460.087 536.422,460.087 L523.916,455.145 C523.916,455.145 519.799,448.969 534.636,452.675 C549.472,456.381 566.795,457.616 566.795,457.616 C566.795,457.616 568.494,457.233 570.369,452.675 C572.243,448.116 572.155,437.851 572.155,437.851 L581.088,435.381 C581.088,435.381 595.749,437.009 595.382,424.263 C595.014,411.516 597.422,406.575 607.888,409.439 C618.354,412.303 606.846,416.501 611.461,419.322 C616.077,422.142 616.208,429.685 607.888,430.439 C599.568,431.194 595.968,440.726 604.315,444.028 C612.661,447.329 620.395,442.792 620.395,442.792 C620.395,442.792 615.604,433.052 620.395,432.910 C625.185,432.768 634.688,429.204 634.688,429.204 L645.408,429.204 L648.981,419.322 L647.194,410.675 L650.768,405.733 L661.487,405.733 L675.781,410.675 L686.500,409.439 L688.287,403.263 L688.287,399.557 L672.207,398.321 L670.421,392.145 L675.781,382.262 L682.927,382.262 L684.714,378.556 L670.421,368.674 L654.341,357.556 C654.341,357.556 653.833,351.063 647.194,351.380 C640.556,351.697 640.135,341.465 659.701,345.203 C679.266,348.942 675.781,341.497 675.781,341.497 L682.927,331.615 L677.567,326.674 L665.061,320.497 C665.061,320.497 661.321,312.757 673.994,314.321 C686.667,315.884 685.449,314.572 682.927,308.144 C680.405,301.716 682.927,297.026 682.927,297.026 L666.847,287.144 L648.981,287.144 L636.474,280.967 L647.194,277.262 L648.981,267.379 C648.981,267.379 659.131,263.237 661.487,267.379 C663.844,271.521 665.464,275.590 675.781,273.556 C686.098,271.521 684.714,262.438 684.714,262.438 C684.714,262.438 684.636,246.892 693.647,250.085 C702.658,253.278 699.007,264.909 699.007,264.909 C699.007,264.909 694.271,281.337 700.794,285.909 C707.316,290.480 707.332,285.954 715.087,287.144 C722.842,288.334 731.162,295.188 732.953,289.615 C734.745,284.041 737.939,280.498 731.166,277.262 C724.394,274.025 720.910,268.960 729.380,267.379 C737.850,265.798 735.450,261.615 727.593,261.203 C719.736,260.790 716.873,253.791 716.873,253.791 C716.873,253.791 711.841,241.503 720.447,237.732 C729.052,233.961 724.829,226.846 718.660,224.143 C712.491,221.441 712.926,214.985 718.660,213.026 C724.394,211.067 719.900,207.282 709.727,206.849 C699.553,206.416 692.448,213.487 691.860,215.496 C691.273,217.506 681.359,221.156 681.140,222.908 C680.922,224.660 669.382,227.461 665.061,227.849 C660.739,228.237 643.621,236.496 643.621,236.496 L632.901,238.967 C632.901,238.967 622.708,228.568 631.114,226.614 C639.520,224.660 656.592,221.905 659.701,221.673 C662.809,221.441 672.207,217.967 672.207,217.967 L684.714,200.673 L706.153,182.143 L718.660,178.437 L729.380,174.731 L738.313,167.319 L736.526,163.613 L718.660,164.849 L693.647,161.143 L656.127,152.496 L636.474,142.613 L604.315,120.378 L577.515,112.966 L566.795,114.201 L506.049,146.319 L472.103,147.555 L457.810,137.672 L457.810,120.378 L429.224,119.143 L407.784,131.496 L398.851,132.731 L384.558,132.731 L386.344,129.025 L397.064,126.554 L432.797,106.789 L472.103,109.260 L489.970,114.201 C489.970,114.201 492.841,112.232 498.903,110.495 C504.965,108.759 511.409,101.848 511.409,101.848 L520.343,99.378 L516.769,84.554 L531.062,74.672 L547.142,72.201 L552.502,74.672 L556.075,70.966 L557.862,61.083 L568.582,61.083 L570.369,54.907 L557.862,46.259 L545.355,43.789 L541.782,36.377 L534.636,36.377 L529.276,42.554 L518.556,41.318 L518.556,16.612 L500.689,14.142 L495.329,11.671 L464.956,25.259 L463.170,37.612 L452.450,36.377 L447.090,38.848 L443.517,46.259 L438.157,49.965 L425.650,51.201 Z",
      fillColor: "rgba(228,245,255,0.9)",
      strokeColor: "#E4F5FF",
      lineWidth: 0,
      pos: [52, 186],
      filter: "drop-shadow(0, 0, 15, #D8F1FD)",
      // filter: "drop-shadow(0, 0, 45, #006DCA)",
      scale: 1,
      lineDash: [5000, 5000],
      lineDashOffset: 1200,
      opacity: 1,
    });
    this.out.attr({
      d:
        "M425.650,51.201 L418.504,35.142 C418.504,35.142 388.656,32.026 377.411,32.671 C366.166,33.316 341.678,27.730 341.678,27.730 L318.452,4.259 L305.945,1.789 C305.945,1.789 292.948,5.899 286.292,4.259 C279.636,2.619 272.016,6.118 268.426,6.730 C264.835,7.342 262.023,6.664 264.852,12.906 C267.681,19.148 266.893,25.664 268.426,36.377 C269.958,47.090 266.262,53.168 261.279,53.671 C256.296,54.174 259.527,55.071 255.919,57.377 C252.311,59.684 244.507,58.875 246.986,64.789 C249.465,70.703 244.507,73.852 246.986,78.377 C249.465,82.903 234.549,82.444 230.906,82.083 C227.263,81.723 215.483,80.520 214.826,87.025 C214.169,93.529 192.493,85.833 205.893,98.142 C219.293,110.452 214.563,94.360 223.759,105.554 C232.955,116.748 235.119,116.246 230.906,121.613 C226.694,126.981 218.329,119.656 214.826,129.025 C211.323,138.394 204.106,135.201 204.106,135.201 C204.106,135.201 205.814,142.963 182.667,138.907 C159.519,134.852 159.458,140.667 154.080,135.201 C148.703,129.735 133.560,131.157 138.001,138.907 C142.441,146.658 152.977,152.365 145.147,156.202 C137.317,160.039 132.737,164.477 141.574,168.555 C150.411,172.632 137.607,179.563 145.147,183.378 C152.688,187.194 157.846,196.114 148.720,196.967 C139.594,197.819 125.214,204.007 127.281,210.555 C129.348,217.103 129.137,232.736 120.134,232.791 C111.131,232.845 117.060,239.973 105.841,238.967 C94.622,237.961 85.724,241.700 86.188,245.144 C86.652,248.587 84.209,252.807 75.468,255.026 C66.727,257.245 55.815,262.438 55.815,262.438 L23.655,277.262 C23.655,277.262 12.874,284.488 21.869,288.379 C30.863,292.271 15.598,299.530 7.576,298.262 C-0.447,296.994 -0.088,305.127 4.002,308.144 C8.092,311.161 -2.776,315.272 5.789,320.497 C14.354,325.723 3.135,328.346 14.722,330.380 C26.309,332.413 14.013,336.370 21.869,336.556 C29.725,336.742 36.162,337.792 36.162,337.792 C36.162,337.792 31.590,345.903 46.882,346.439 C62.173,346.974 52.872,356.441 55.815,358.792 C58.758,361.142 71.895,372.380 71.895,372.380 C71.895,372.380 80.224,380.885 75.468,385.968 C70.712,391.052 72.884,408.368 82.615,411.910 C92.345,415.452 79.619,422.164 87.975,425.498 C96.330,428.832 78.323,435.566 86.188,439.087 C82.667,446.148 87.808,450.499 96.908,447.734 C106.007,444.968 112.988,437.851 112.988,437.851 L125.494,444.028 L141.574,434.145 L146.934,437.851 L157.654,450.204 L157.654,461.322 L148.720,469.969 C148.720,469.969 133.368,473.916 148.720,481.087 C164.073,488.258 163.977,497.375 166.587,497.146 C169.197,496.916 176.466,509.488 179.093,509.499 C181.721,509.510 177.307,520.617 177.307,520.617 L180.880,526.793 L193.387,536.676 L186.240,547.793 C186.240,547.793 189.997,557.610 196.960,555.205 C203.923,552.800 211.253,550.264 211.253,550.264 L232.693,552.734 L250.559,560.146 L259.492,558.911 L270.212,549.029 L280.932,544.087 C280.932,544.087 285.040,550.045 293.439,545.323 C301.838,540.600 291.048,529.690 297.012,524.323 C302.976,518.955 314.878,519.381 314.878,519.381 C314.878,519.381 327.219,534.150 332.745,539.146 C338.271,544.142 339.611,562.814 350.611,565.088 C361.611,567.361 366.709,576.063 373.838,572.499 C380.967,568.936 386.344,565.088 386.344,565.088 L386.344,560.146 L407.784,562.617 C407.784,562.617 422.357,558.288 423.864,553.970 C425.370,549.652 437.912,546.941 445.303,550.264 C452.695,553.587 461.278,547.771 464.956,555.205 C468.635,562.639 463.047,569.132 472.103,578.676 C465.788,589.007 482.622,595.544 481.036,583.617 C487.421,579.561 495.329,582.382 495.329,582.382 L498.903,567.558 C498.903,567.558 498.649,549.018 507.836,551.499 C517.023,553.981 519.107,558.747 520.343,550.264 C521.577,541.781 516.769,539.146 516.769,539.146 C516.769,539.146 520.596,532.992 511.409,530.499 C502.222,528.007 493.368,519.305 506.049,518.146 C518.731,516.987 518.950,515.391 518.556,509.499 C518.162,503.607 514.142,496.763 522.129,494.675 C530.116,492.587 541.782,481.087 541.782,481.087 L550.715,476.146 C550.715,476.146 546.266,472.822 550.715,468.734 C555.164,464.645 536.422,460.087 536.422,460.087 L523.916,455.145 C523.916,455.145 519.799,448.969 534.636,452.675 C549.472,456.381 566.795,457.616 566.795,457.616 C566.795,457.616 568.494,457.233 570.369,452.675 C572.243,448.116 572.155,437.851 572.155,437.851 L581.088,435.381 C581.088,435.381 595.749,437.009 595.382,424.263 C595.014,411.516 597.422,406.575 607.888,409.439 C618.354,412.303 606.846,416.501 611.461,419.322 C616.077,422.142 616.208,429.685 607.888,430.439 C599.568,431.194 595.968,440.726 604.315,444.028 C612.661,447.329 620.395,442.792 620.395,442.792 C620.395,442.792 615.604,433.052 620.395,432.910 C625.185,432.768 634.688,429.204 634.688,429.204 L645.408,429.204 L648.981,419.322 L647.194,410.675 L650.768,405.733 L661.487,405.733 L675.781,410.675 L686.500,409.439 L688.287,403.263 L688.287,399.557 L672.207,398.321 L670.421,392.145 L675.781,382.262 L682.927,382.262 L684.714,378.556 L670.421,368.674 L654.341,357.556 C654.341,357.556 653.833,351.063 647.194,351.380 C640.556,351.697 640.135,341.465 659.701,345.203 C679.266,348.942 675.781,341.497 675.781,341.497 L682.927,331.615 L677.567,326.674 L665.061,320.497 C665.061,320.497 661.321,312.757 673.994,314.321 C686.667,315.884 685.449,314.572 682.927,308.144 C680.405,301.716 682.927,297.026 682.927,297.026 L666.847,287.144 L648.981,287.144 L636.474,280.967 L647.194,277.262 L648.981,267.379 C648.981,267.379 659.131,263.237 661.487,267.379 C663.844,271.521 665.464,275.590 675.781,273.556 C686.098,271.521 684.714,262.438 684.714,262.438 C684.714,262.438 684.636,246.892 693.647,250.085 C702.658,253.278 699.007,264.909 699.007,264.909 C699.007,264.909 694.271,281.337 700.794,285.909 C707.316,290.480 707.332,285.954 715.087,287.144 C722.842,288.334 731.162,295.188 732.953,289.615 C734.745,284.041 737.939,280.498 731.166,277.262 C724.394,274.025 720.910,268.960 729.380,267.379 C737.850,265.798 735.450,261.615 727.593,261.203 C719.736,260.790 716.873,253.791 716.873,253.791 C716.873,253.791 711.841,241.503 720.447,237.732 C729.052,233.961 724.829,226.846 718.660,224.143 C712.491,221.441 712.926,214.985 718.660,213.026 C724.394,211.067 719.900,207.282 709.727,206.849 C699.553,206.416 692.448,213.487 691.860,215.496 C691.273,217.506 681.359,221.156 681.140,222.908 C680.922,224.660 669.382,227.461 665.061,227.849 C660.739,228.237 643.621,236.496 643.621,236.496 L632.901,238.967 C632.901,238.967 622.708,228.568 631.114,226.614 C639.520,224.660 656.592,221.905 659.701,221.673 C662.809,221.441 672.207,217.967 672.207,217.967 L684.714,200.673 L706.153,182.143 L718.660,178.437 L729.380,174.731 L738.313,167.319 L736.526,163.613 L718.660,164.849 L693.647,161.143 L656.127,152.496 L636.474,142.613 L604.315,120.378 L577.515,112.966 L566.795,114.201 L506.049,146.319 L472.103,147.555 L457.810,137.672 L457.810,120.378 L429.224,119.143 L407.784,131.496 L398.851,132.731 L384.558,132.731 L386.344,129.025 L397.064,126.554 L432.797,106.789 L472.103,109.260 L489.970,114.201 C489.970,114.201 492.841,112.232 498.903,110.495 C504.965,108.759 511.409,101.848 511.409,101.848 L520.343,99.378 L516.769,84.554 L531.062,74.672 L547.142,72.201 L552.502,74.672 L556.075,70.966 L557.862,61.083 L568.582,61.083 L570.369,54.907 L557.862,46.259 L545.355,43.789 L541.782,36.377 L534.636,36.377 L529.276,42.554 L518.556,41.318 L518.556,16.612 L500.689,14.142 L495.329,11.671 L464.956,25.259 L463.170,37.612 L452.450,36.377 L447.090,38.848 L443.517,46.259 L438.157,49.965 L425.650,51.201 Z",
      fillColor: "#D8F1FD",
      strokeColor: "#E4F5FF",
      lineWidth: 0,
      pos: [52, 186],
      filter: "drop-shadow(0, 0, 41, #006DCA)",
      scale: 1,
      lineDash: [5000, 5000],
      lineDashOffset: 1200,
      opacity: 1,
    });
    this.Group.append(this.out, this.outLine);
  }
}

export default Outline;
